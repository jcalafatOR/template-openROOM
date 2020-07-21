<?php
/**
 * @package Module EB Sticky Cookie Notice for Joomla!
 * @version 1.1: mod_ebstickycookienotice.php Jan 2020
 * @author url: https://www/extnbakers.com
 * @copyright Copyright (C) 2019 extnbakers.com. All rights reserved.
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html 
**/

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' ); ?>
<?php 
//Get Parameters

 $style = $params->get('opt');
 $position = $params->get('pos');
 $header = $params->get('cookieheader');
 $message = $params->get('cookiemsg');
 $button = $params->get('btn');

 $privacypolicy_text = $params->get('privacypolicy_text', '');
 $privacypolicy_link = $params->get('privacypolicy_link', '');
 $privacypolicy_link_link = $privacypolicy_link != '' ? $privacypolicy_link : 'javascript:void(0);';
 $privacypolicy_link_target = $params->get('privacypolicy_link_target', 'none');
 $target = '';
 if($privacypolicy_link_target == 'new_window' && $privacypolicy_link != ''){
	$target = 'target="_blank"';
 }



	//Include CSS and JAVASCRIPT
	$document = JFactory::getDocument();	
//	$document->addStyleSheet("modules/".$module->module."/tmpl/assets/css/cookie.css");
	//$document->addStyleSheet("modules/".$module->module."/tmpl/assets/css/responsive.css");
	//$document->addScript("modules/".$module->module."/tmpl/assets/js/cookie_script.js");
	$document->setMetaData( "viewport", "width=device-width, initial-scale=1.0" );

?>

<div class="<?php echo $style =="SimpleBar"?"notice_div_simplebar":"notice_div_ribbin"?> <?php echo $position=="Bottom"?"bottom":"top"?>" id="eu_cookies">
    <div class="or_cookieblock">
      <?php if($header!=''){ ?><p class="h2"><?php echo $header;?></p> <?php } ?>
      <p><?php echo $message; ?><?php if($privacypolicy_text!=''){ ?>
		<a <?php echo $target; ?> href="<?php echo $privacypolicy_link_link; ?>" class="orbtn orbtn-inline" aria-label="Cookie Policy" title="<?php echo $privacypolicy_text; ?>"><?php echo $privacypolicy_text; ?></a>
    <?php } ?>
    <a class="orbtn orbtn-inline" href="javascript:void(0);" onclick="calltohide()" id="hideme"><?php echo $button;?></a></p>
      
    </div>
</div>
<?php /*
<script type="text/javascript">
	check_cookie(getBaseURL());
</script> */ ?>