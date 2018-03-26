<?php
namespace JNL\Transformers\User;

use JNL\Core\Transformer;
use JNL\Entities\Token;

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
