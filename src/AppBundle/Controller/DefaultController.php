<?php

namespace AppBundle\Controller;
use AppBundle\Entity\User;
use AppBundle\Entity\Appointment;
use AppBundle\Repository\AppointmentRepository;

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
		$appointments = [];
		/* @var $appointment Appointment */
		foreach ($this->getAppointmentRepository()->findAll() as $appointment) {
			$appointments[] = json_encode([
				'title' => 'Reserved',
				'start' => $appointment->getStart()->format("Y-m-d\TH:i:s"),
				'color' => 'red'
			]);
		}
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
			'appointments' => $appointments
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

	/**
	 * @Route("/appointment/create", name="appointment_create")
	 */
	public function addAppointment(Request $request) {
		//test if user is logged in
		/* @var $user User */
		$user = $this->get('security.token_storage')->getToken()->getUser();
		if($user === 'anon.'): die(json_encode(['status' => FALSE, 'response' => 'UNKNOWN_USER'])); endif;
		if(!$request->request->has('param')): die(json_encode(['status' => FALSE, 'response' => 'MISSING_DATE'])); endif;
		$date = new \DateTime();
		$date->setTimestamp(strtotime(json_decode($request->request->get('param'))));
		if($this->getAppointmentRepository()->findOneBy(['start'=>$date])): die(json_encode(['status' => FALSE, 'response' => 'APPT_RESERVED'])); endif;
		$newAppointment = new Appointment();
		$newAppointment->setUser(1);
		$newAppointment->setStart($date);
		$this->getAppointmentRepository($newAppointment);
		$response = [
			'status' => TRUE,
			'response' => [
				'title' => 'Your appointment',
				'start' => json_decode($request->request->get('param')),
				'editable' => TRUE,
				'color' => 'green'
			]	
		];
		die(json_encode($response));
	}




	/**
	 * 
	 * @return AppointmentRepository
	 */
	private function getAppointmentRepository(Appointment $newAppointment = NULL) {
		$em = $this->getDoctrine()->getManager();
		if(isset($newAppointment)) {
			$em->persist($newAppointment);
			$em->flush();
		} else {
			return $em->getRepository('AppBundle:Appointment');
		}
	}

}
