<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {


    public function updateJwtData(JWTCreatedEvent $event)
    {
        // Récupérer l'utilisateur (pour avoir son firstname et lastname)
        $user = $event->getUser();

        // Enrichir les data pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['firstname'] = $user->getFirstName();
        $data['lastname'] = $user->getLastName();
        $event->setData($data);
    }
}