<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: *");

function string2normal($text)
{
	$text = htmlspecialchars($text, ENT_QUOTES, 'utf-8');
	$text = trim(str_replace('&amp;', '&', $text));
	$text = str_replace("'", "&rsquo;", $text);
	return $text;
}

function mailing($to, $subject, $message, $from, $html = false)
{
	if ($html == false) 
	{
		$message = nl2br($message);
	}

	$from[1] = '=?UTF-8?B?'.base64_encode($from[1]).'?=';
	$subject = '=?UTF-8?B?'.base64_encode($subject).'?=';


	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= "From: " . $from[1] . ' <' . $from[0] . '>'. "\r\n";

	$headers .= "\n";
	
	mail($to, $subject, $message, $headers, '-f'.($from[0]));
}


$postData = json_decode(file_get_contents('php://input'), true);

if ($postData === null)
{
    echo json_encode(array('error'=>'Data not send'));
    exit;
}

$name = isset($postData['name']) && is_string($postData['name']) && strlen($postData['name']) > 0 ? string2normal($postData['name']) : false;
$phone = isset($postData['phone']) && is_string($postData['phone']) && strlen($postData['phone']) > 0 ? string2normal($postData['phone']) : false;

if ($name === false)
{
    echo json_encode(array('error'=>'ФИО не указано'));
    exit;
}

if ($phone === false)
{
    echo json_encode(array('error'=>'Телефон не указан'));
    exit;
}

$message = "<b>Новая заявка</b>

ФИО: ".$name."
Телефон: ".$phone."

IP-адрес отправителя: ".$_SERVER['REMOTE_ADDR'];

mailing('edkirill@yandex.ru', 'Новая заявка / видеонаблюдение', $message, array('info@rosfondom.ru', 'Росфондом Инфо'));

echo json_encode(array('result'=>'OK'));

?>