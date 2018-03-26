<?php
namespace JNL\Core;

use League\Fractal\Serializer\ArraySerializer;

class Serializer extends ArraySerializer
{
    public function collection($resourceKey, array $data)
    {
        return $data;
    }
}
