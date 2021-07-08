<?php defined('_JEXEC') or die('Restricted access');
$this->setGenerator("OpenROOM"); // Elimina meta Generator
// Cargamos la configuración del hotel
if(file_exists(__DIR__ . '/or_tpl_paramsDefinition.php')) {
  require_once __DIR__ .'/or_tpl_paramsDefinition.php';
  $or_tplParamsController = new or_tplParams();
}
if(file_exists(__DIR__ . '/class_openroom_basics.php')) { require_once __DIR__ .'/class_openroom_basics.php'; $orBasic = new openroom_basics(); }
$htmllang = explode('-',$this->language);
if(isset($_GET['start']) && !isset($currentPage))
{
  $numItems = 8;
  $currentPage = $_GET['start'] / $numItems;
	$doc = JFactory::getDocument();
	$doc->setTitle($doc->getTitle() . " p. ".$currentPage);
	$doc->setDescription($doc->getDescription() . " p. ".$currentPage);
}
?>
<!DOCTYPE html>
<html xml:lang="<?php echo $htmllang[0]; ?>" lang="<?php echo $htmllang[0]; ?>" >
<head>
<jdoc:include type="head" />
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/uikit.min.css<?php echo $orBasic->or_filemtime(__DIR__.'/css/uikit.min.css'); ?>" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/bestyle.css<?php echo $orBasic->or_filemtime(__DIR__.'/css/bestyle.css'); ?>" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/template.css<?php echo $orBasic->or_filemtime(__DIR__.'/css/template.css'); ?>" type="text/css" />
<!--[if ie]><meta http-equiv="X-UA-Compatible" content="IE=Edge"/><![endif]-->
<!-- Google Tag Manager -->
<script>
	var dataLayer = [];
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','<?php echo BE_GOOGLE_TAGMANAGER; ?>');
</script>
<!-- End Google Tag Manager -->
<?php
// incluye alternate links
if(file_exists(__DIR__ . '/or_multilang_alternate.php')) { include __DIR__ .'/or_multilang_alternate.php'; }

/** Obtenemos la clase del menu **/
  $or_bodyClassApp = JFactory::getApplication();
  $or_bodyClassMenu = $or_bodyClassApp->getMenu()->getActive();
  $or_bodyClass = '';
  $or_homeClass = JRoute::_($or_bodyClassApp->getMenu()->getActive()->home) == 1 ? " or_home_class" : "";
  if (is_object($or_bodyClassMenu))
    $or_bodyClass = $or_bodyClassMenu->params->get('pageclass_sfx');
    
    // CSS Unsupported
    $or_unsuportedStyle = "position: fixed;";
    $or_unsuportedStyle .= "background-color: #232323;";
    $or_unsuportedStyle .= "color: white !important;";
    $or_unsuportedStyle .= "display: block;";
    $or_unsuportedStyle .= "width:90%;";
    $or_unsuportedStyle .= "height: 100%;";
    $or_unsuportedStyle .= "z-index: 1000;";
    $or_unsuportedStyle .= "padding: 25% 5% 0;";
    $or_unsuportedStyle .= "text-align:center;";
?>
<script>
var newChild = '<div style="<?php echo $or_unsuportedStyle; ?>"><?php echo JText::_('TPL_OPENROOM_BE_COMPATIBILIDAD_ERROR'); ?></div>';
</script>
<?php if(file_exists(__DIR__ . '/or_tpl_favicon.php')) { include __DIR__ .'/or_tpl_favicon.php'; } ?>
<jdoc:include type="modules" name="orhead" />
</head>
<body class="<?php echo $or_bodyClass." ".$or_homeClass; ?>">
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo BE_GOOGLE_TAGMANAGER; ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
<jdoc:include type="modules" name="top" />
<?php
if(!defined("BE_ACTIVAR") || BE_ACTIVAR == 1)
{
if(file_exists(__DIR__ .'/_becontent/buscador.php')) { include __DIR__ .'/_becontent/buscador.php'; }
else{ echo '<div class="be_fatalerror">ERROR: No se ha cargado el contenedor del Motor de reservas</div>';}
}
?>
<div class="or-topend"></div>
<jdoc:include type="modules" name="user1" />
<jdoc:include type="modules" name="user2" />
<jdoc:include type="modules" name="user3" />
<jdoc:include type="modules" name="user4" />
<jdoc:include type="component" />
<jdoc:include type="modules" name="user5" />
<jdoc:include type="modules" name="user6" />
<jdoc:include type="modules" name="user7" />
<jdoc:include type="modules" name="user8" />
<jdoc:include type="modules" name="footer1" />
<jdoc:include type="modules" name="footer2" />
<jdoc:include type="modules" name="footer3" />
<div id="ormodal_controller">
<jdoc:include type="modules" name="modal" />
</div>
<?php 
if(!defined("BE_ACTIVAR") || BE_ACTIVAR == 1)
{ ?>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/uikit.min.js<?php echo $orBasic->or_filemtime(__DIR__.'/js/uikit.min.js'); ?>" type="text/javascript"></script>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/jquery-ui.js<?php echo $orBasic->or_filemtime(__DIR__.'/js/jquery-ui.js'); ?>" type="text/javascript"></script>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/moment.min.js<?php echo $orBasic->or_filemtime(__DIR__.'/js/moment.min.js'); ?>" type="text/javascript"></script>
<?php
/** CARGAMOS MOMENT POR IDIOMA **/
if(file_exists(__DIR__ . '/js/moment-local-'.$this->language.'.js')) { ?>	
	<script src="<?php echo $this->baseurl.'/templates/'.$this->template.'/js/moment-local-'.$this->language.'.js'.$orBasic->or_filemtime(__DIR__.'/js/moment-local-'.$this->language.'.js'); ?>" type="text/javascript"></script>
<?php } else { ?>
	<script src="<?php echo $this->baseurl.'/templates/'.$this->template.'/js/moment-local-en-gb.js'.$orBasic->or_filemtime(__DIR__.'/js/moment-local-en-gb.js'); ?>" type="text/javascript"></script>
<?php } //echo "IDIOMA: ".$this->baseurl.'/templates/'.$this->template.'/js/moment-local-'.$this->language.'.js'; ?>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/daterangepicker.js<?php echo $orBasic->or_filemtime(__DIR__.'/js/daterangepicker.js'); ?>" type="text/javascript"></script>
<?php } ?>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/bescripts.js<?php echo $orBasic->or_filemtime(__DIR__.'/js/bescripts.js'); ?>" type="text/javascript"></script>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/js/or_template.js<?php echo $orBasic->or_filemtime(__DIR__.'/js/or_template.js'); ?>" type="text/javascript"></script>

</body>
</html>