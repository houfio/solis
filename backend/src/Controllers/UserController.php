<?php
namespace JNL\Controllers;

use DateTime;
use JNL\Core\Controller;
use JNL\Entities\ContactData;
use JNL\Entities\Token;
use JNL\Entities\User;
use JNL\Core\RouteSet;
use JNL\Transformers\User\UserTransformer;
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
        return $this->createItem($this->getAuthenticatedUser(), UserTransformer::class);
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

        $token = new Token();
        $token->user = $user;
        $token->token = bin2hex(random_bytes(64));
        $token->user_agent = $serverParams['HTTP_USER_AGENT'];
        $token->ip_address = $serverParams['REMOTE_ADDR'];

        $this->getEntityManager()->persist($token);
        $this->getEntityManager()->flush();

        return ['token' => $token->token];
    }

    public function getLogout()
    {
        $header = $this->getRequest()->getHeader('Authorization');

        if (count($header) === 0) {
            throw new UnauthorizedException();
        }

        $header = $header[0];

        $tokenRepo = $this->getEntityManager()->getRepository(Token::class);
        /** @var Token $token */
        $token = $tokenRepo->findOneBy(['token' => $header]);
        $token->active = false;

        $this->getEntityManager()->merge($token);
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
            foreach ($user->tokens as $token) {
                $token->active = false;

                $this->getEntityManager()->merge($token);
            }
        }

        $this->getEntityManager()->merge($user);
        $this->getEntityManager()->flush();

        return true;
    }
}
