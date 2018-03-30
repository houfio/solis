<?php
namespace Solis\Transformers\User;

use Solis\Core\Transformer;
use Solis\Entities\Token;
use Solis\Entities\User;
use League\Fractal\Resource\ResourceInterface;

class UserTransformer extends Transformer
{
    public $defaultIncludes = [
        'contact_data',
        'tokens'
    ];

    public function transform(User $user): array
    {
        return [
            'id' => $user->id,
            'admin' => $user->admin,
            'membership' => [
                'id' => $user->membership_id,
                'section' => $user->membership_section,
            ],
            'creation_date' => $user->creation_date->format('Y-m-d H:i'),
            'receive_emails' => $user->receive_emails
        ];
    }

    public function includeContactData(User $user): ResourceInterface
    {
        return $this->createItem($user->contact_data, ContactDataTransformer::class);
    }

    public function includeTokens(User $user): ResourceInterface
    {
        return $this->createCollection(
            array_filter($user->tokens->toArray(), function (Token $token) {
                return $token->active;
            }),
            TokenTransformer::class
        );
    }
}
