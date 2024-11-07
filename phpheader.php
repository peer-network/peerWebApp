<?php 
header("Content-Security-Policy: default-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self' data: blob:; worker-src 'self' about:; connect-src 'self' https://getpeer.eu/graphql; child-src 'self'; script-src 'self' about:; script-src-elem 'self' about:; base-uri 'self'; frame-ancestors 'self'; form-action 'self'");
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