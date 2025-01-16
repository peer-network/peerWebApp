<?php 
header("Content-Security-Policy: default-src https://media.getpeer.eu:8443 'self'; style-src 'self'; img-src 'self' https://media.getpeer.eu:8443 data:; media-src 'self' https://media.getpeer.eu:8443 data: blob:; worker-src 'self' about:; connect-src 'self' https://media.getpeer.eu:8443 https://getpeer.eu/graphql; child-src https://media.getpeer.eu:8443 'self'; script-src 'self' about:; script-src-elem 'self' about:; base-uri 'self'; frame-ancestors 'self'; form-action 'self'");
ini_set("session.cookie_httponly", 1);

// https://getpeer.eu:8443/
$me = substr($_SERVER["REQUEST_URI"],1);
if(strpos($me, '/')!==false) $me = substr($me,strrpos($me, '/')+1);
if(strpos($me, '?')!==false) $me = substr($me,0,strpos($me, '?'));
if(!strlen($me)) $me = 'index.php';
if(!strpos($me,'.php')) $me .= '.php';
$modified = gmdate("D, d M Y H:i:s", filemtime($me)) . " GMT";
header("Last-Modified:" . $modified);
$modified = date('c', filemtime($me));
header("Etag:" . md5_file($me));
header('Content-Type:text/html; charset=UTF-8');
?>