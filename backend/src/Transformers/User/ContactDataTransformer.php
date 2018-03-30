<?php
namespace Solis\Transformers\User;

use Solis\Core\Transformer;
use Solis\Entities\ContactData;

class ContactDataTransformer extends Transformer
{
    public function transform(ContactData $data): array
    {
        return [
            'id' => $data->id,
            'first_name' => $data->first_name,
            'last_name' => $data->last_name,
            'email' => $data->email,
            'phone_number' => $data->phone_number,
            'zip_code' => $data->zip_code,
            'house_number' => $data->house_number,
            'birth_date' => $data->birth_date->format('Y-m-d')
        ];
    }
}
