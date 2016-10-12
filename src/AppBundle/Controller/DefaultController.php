<?php

namespace AppBundle\Controller;

use FOS\UserBundle\Form\Type\RegistrationFormType;
use AppBundle\Entity\User;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
        ]);
    }

	/**
	 * @Route("/login-success", name="login_success")
	 */
	public function loginSuccessAction() {
		/* @var $user User */
		$user = $this->get('security.token_storage')->getToken()->getUser();
		$translator = $this->get('translator');
		$output = '<div class="row">';
		$output .= "<div class='col-sm-12'>{$translator->trans('messages.login.success', ['%username%'=>$user->getUsername()])}</div>";
		$output .= "<div class='col-sm-12'><button type='button' class='btn btn-primary pull-right' data-dismiss='modal'>{$translator->trans('page.button.ok')}</button></div>";
		$output .= "<script type='text/javascript'>$('#app-modal-window').on('hidden.bs.modal', function(){ location.reload(true); });</script>";
		die($output);
	}
}
