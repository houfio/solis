<?php
namespace JNL\Controller;

use DateTime;
use JNL\Core\Controller;
use JNL\Entity\ContactData;
use JNL\Entity\Login;
use JNL\Entity\User;
use JNL\Core\RouteSet;
use League\Route\Http\Exception\UnauthorizedException;

class UserController extends Controller
{
    const PHONE_NUMBER_REGEX = '/^[0-9]{2}-[0-9]{8}$/';
    const ZIP_CODE_REGEX = '/^[0-9]{4}[A-Z]{2}$/';
    const HOUSE_NUMBER_REGEX = '/^[0-9-]+[A-B]*$/';

    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('user', '/user', 'getUser', true)
            ->post('user_register', '/user/register', 'postRegister', false, [
                'membership_id' => ['required', 'integer'],
                'membership_section' => ['required'],
                'password' => ['required', 'lengthMin' => [8]],
                'first_name' => ['required'],
                'last_name' => ['required'],
                'email' => ['required', 'email'],
                'phone_number' => ['required', 'regex' => [static::PHONE_NUMBER_REGEX]],
                'zip_code' => ['required', 'regex' => [static::ZIP_CODE_REGEX]],
                'house_number' => ['required', 'regex' => [static::HOUSE_NUMBER_REGEX]],
                'birth_date' => ['required', 'date']
            ])
            ->post('user_login', '/user/login', 'postLogin', false, [
                'email' => ['required', 'email'],
                'password' => ['required']
            ])
            ->get('user_logout', '/user/logout', 'getLogout', true)
            ->post('user_update', '/user/update', 'postUpdate', true, [
                'email' => ['email'],
                'receive_emails' => ['boolean'],
                'phone_number' => ['regex' => [static::PHONE_NUMBER_REGEX]],
                'zip_code' => ['regex' => [static::ZIP_CODE_REGEX]],
                'house_number' => ['regex' => [static::HOUSE_NUMBER_REGEX]]
            ])
            ->post('user_update_password', '/user/update/password', 'postPassword', true, [
                'password' => ['required', 'lengthMin' => [8]],
                'logout' => ['required', 'boolean']
            ]);
    }

    public function getUser()
    {
        return $this->getAuthenticatedUser();
    }

    public function postRegister(array $args)
    {
        $contactDataRepo = $this->getEntityManager()->getRepository(ContactData::class);
        $contactData = $contactDataRepo->findOneBy(['email' => $args['email']]);
        $userRepo = $this->getEntityManager()->getRepository(User::class);

        if (($contactData && $userRepo->findOneBy(['contact_data' => $contactData]))
            || $userRepo->findOneBy(['membership_id' => $args['membership_id']])) {
            return false;
        }

        $contactData = new ContactData();
        $contactData->first_name = $args['first_name'];
        $contactData->last_name = $args['last_name'];
        $contactData->email = $args['email'];
        $contactData->phone_number = $args['phone_number'];
        $contactData->zip_code = $args['zip_code'];
        $contactData->house_number = $args['house_number'];
        $contactData->birth_date = DateTime::createFromFormat('Y-m-d', $args['birth_date']);
        $user = new User();
        $user->contact_data = $contactData;
        $user->membership_id = $args['membership_id'];
        $user->membership_section = $args['membership_section'];
        $user->password = password_hash($args['password'], PASSWORD_BCRYPT);

        $this->getEntityManager()->persist($contactData);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postLogin(array $args)
    {
        $serverParams = $this->getRequest()->getServerParams();

        if (!array_key_exists('HTTP_USER_AGENT', $serverParams)
            || !array_key_exists('REMOTE_ADDR', $serverParams)) {
            return false;
        }

        $contactDataRepo = $this->getEntityManager()->getRepository(ContactData::class);
        $contactData = $contactDataRepo->findOneBy(['email' => $args['email']]);

        if (!$contactData) {
            return false;
        }

        $userRepo = $this->getEntityManager()->getRepository(User::class);
        /** @var User $user */
        $user = $userRepo->findOneBy(['contact_data' => $contactData]);

        if (!$user || !$user->approved || !password_verify($args['password'], $user->password)) {
            return false;
        }

        $login = new Login();
        $login->user = $user;
        $login->token = bin2hex(random_bytes(64));
        $login->user_agent = $serverParams['HTTP_USER_AGENT'];
        $login->ip_address = $serverParams['REMOTE_ADDR'];

        $this->getEntityManager()->persist($login);
        $this->getEntityManager()->flush();

        return ['token' => $login->token];
    }

    public function getLogout()
    {
        $token = $this->getRequest()->getHeader('Authorization');

        if (count($token) === 0) {
            throw new UnauthorizedException();
        }

        $token = $token[0];

        $login_repo = $this->getEntityManager()->getRepository(Login::class);
        /** @var Login $login */
        $login = $login_repo->findOneBy(['token' => $token]);
        $login->active = false;

        $this->getEntityManager()->merge($login);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postUpdate(array $args)
    {
        $user = $this->getAuthenticatedUser();
        $contactData = $user->contact_data;

        foreach ($args as $key => $value) {
            if (property_exists($user, $key)) {
                $user->$key = $value;
            } else {
                $contactData->$key = $value;
            }
        }

        $this->getEntityManager()->merge($user);
        $this->getEntityManager()->merge($contactData);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postPassword(array $args)
    {
        $user = $this->getAuthenticatedUser();

        $user->password = password_hash($args['password'], PASSWORD_BCRYPT);

        if ($args['logout']) {
            foreach ($user->logins as $login) {
                $login->active = false;

                $this->getEntityManager()->merge($login);
            }
        }

        $this->getEntityManager()->merge($user);
        $this->getEntityManager()->flush();

        return true;
    }
}
