<?php
namespace Solis\Core\Traits;

use Zend\Diactoros\ServerRequest;

trait RequestAwareTrait
{
    private $request;

    public function getRequest(): ServerRequest
    {
        return $this->request;
    }

    public function setRequest(ServerRequest $request)
    {
        $this->request = $request;
    }
}
