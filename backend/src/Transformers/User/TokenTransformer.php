<?php
namespace Solis\Transformers\User;

use Solis\Core\Transformer;
use Solis\Entities\Token;

class TokenTransformer extends Transformer
{
    public function transform(Token $token): array
    {
        return [
            'id' => $token->id,
            'date' => $token->date->format('Y-m-d H:i'),
            'user_agent' => $token->user_agent,
            'ip_address' => $token->ip_address
        ];
    }
}
