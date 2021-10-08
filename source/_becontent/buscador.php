<?php //setlocale(LC_ALL, contentlang);
/*if(file_exists(__DIR__ . '/lang/' . $this->language . '.json'))
{
  $or_jsonlang_url = __DIR__ .'/lang/' . $this->language . '.json';
}else{$or_jsonlang_url = __DIR__ .'/lang/es-es.json'; echo $or_jsonlang_url; }
$or_jsonlang_get = file_get_contents($or_jsonlang_url);
$or_jsonlang_textos = json_decode($or_jsonlang_get, true);
*/

$webapp_lang = explode('-',$this->language);

switch($webapp_lang[0])
{
  case 'es': $webapp_langID = 1; break;
  case 'en': $webapp_langID = 2; break;
  case 'de': $webapp_langID = 3; break;
  case 'fr': $webapp_langID = 4; break;
  case 'ru': $webapp_langID = 5; break;
  case 'it': $webapp_langID = 6; break;
  case 'ca': $webapp_langID = 7; break;
  case 'pt': $webapp_langID = 8; break;
  default: $webapp_langID = 1; break;
}
require __DIR__ . '/class_or_multihotel.php';
$multihotel = new or_multihotel();
//$tmp = $multihotel->getList();

$mobileappurl = "https://mobilebooking.open-room.com/intro.php?hotel_code=".BE_ID_HOTEL."&webportal_code=".BE_ID_PORTAL."&code_lang=".$webapp_langID;
?>
<script>
<?php if(BE_ESCADENA == 1) {
  $or_jsonHotelList = $multihotel->getList(); ?>
  var beMultiData = JSON.parse(<?php echo $multihotel->returnDates(); ?>);
  //console.log(beMultiData);
  
<?php }else{ ?>
  var beMultiData = JSON.parse('[]');
<?php } ?>
var portal = <?php echo BE_ID_PORTAL; ?>; //561; //ID portal
var hotel = <?php echo '"'.BE_ID_HOTEL.'"'; ?>; //389; //ID hotel
var subdominio = <?php echo '"'.BE_SUBDOMINIO.'"'; ?>; //; //default bookings
<?php defined('BE_CHECKDISPO') or define('BE_CHECKDISPO', 0); ?>
var checkDispo = <?php echo intval(BE_CHECKDISPO); ?>; //; //default bookings
<?php defined('BE_NODSIPOREDIRECT') or define('BE_NODSIPOREDIRECT', 0); ?>
var NoDispoRedirect = <?php echo intval(BE_NODSIPOREDIRECT); ?>; //; //default bookings

// counter rooms + adults + kids
var max_hab = <?php echo BE_MAX_ROOMS; ?>; //5;
var min_hab = <?php echo BE_MIN_ROOMS; ?>; //1;
var max_adul = <?php echo BE_MAX_ADULTS; ?>; //2;
var min_adul = <?php echo BE_MIN_ADULTS; ?>; //1;
var max_kids = <?php echo BE_MAX_KIDS; ?>; //1;
var min_kids = <?php echo BE_MIN_KIDS; ?>; //0;

var or_maxDate = '<?php echo BE_MAXDATE; ?>'; //0;
var or_blockDate_in = [];
var or_blockDate_out = [];
<?php 
$or_countBlockDates = 0;

if(defined('BE_CLOSINGDATE_1_INI') && defined('BE_CLOSINGDATE_1_END') && date("Y-m-d") < date('Y-m-d',strtotime(BE_CLOSINGDATE_1_END))) { ?>
or_blockDate_in.push('<?php echo BE_CLOSINGDATE_1_INI; ?>');
or_blockDate_out.push('<?php echo BE_CLOSINGDATE_1_END; ?>');

<?php
$or_countBlockDates++; } // END IF 
if(defined('BE_CLOSINGDATE_2_INI') && defined('BE_CLOSINGDATE_2_END') && date("Y-m-d") < date('Y-m-d',strtotime(BE_CLOSINGDATE_2_END))) { ?>
or_blockDate_in.push('<?php echo BE_CLOSINGDATE_2_INI; ?>');
or_blockDate_out.push('<?php echo BE_CLOSINGDATE_2_END; ?>');
<?php $or_countBlockDates++; } // END IF 
if(defined('BE_CLOSINGDATE_3_INI') && defined('BE_CLOSINGDATE_3_END') && date("Y-m-d") < date('Y-m-d',strtotime(BE_CLOSINGDATE_3_END))) { ?>
or_blockDate_in.push('<?php echo BE_CLOSINGDATE_3_INI; ?>');
or_blockDate_out.push('<?php echo BE_CLOSINGDATE_3_END; ?>');
<?php $or_countBlockDates++; } // END IF ?>

var or_blockDate_total = <?php echo $or_countBlockDates; ?>;



jQuery(document).ready(function(){ moment.locale('<?php echo $this->language; ?>'); });
</script>

<?php
// Comprobamos si es home //
$or_currentUrl  = JFactory::getApplication();	// Current data
$is_home = JRoute::_($or_temp_app->getMenu()->getActive()->home) == 1 ? "or_behome" : "";

// Comprobamos si metemos el boton extra
if(file_exists(__DIR__ . '/class_or_mobExtraButton.php'))
{
	require_once __DIR__ . '/class_or_mobExtraButton.php';
	$or_nav_extras = new or_mobExtraButton();
	$or_nav_extras_css = $or_nav_extras->getCss();
	$or_nav_extras_content = $or_nav_extras->getContent();
}
?>
 <div class="buscador <?php echo $is_home; ?>" id="buscador">
   <div class="be-mobile only_mobile">
     <?php if(defined('BE_MOBILEWEBAPP') && BE_MOBILEWEBAPP == 1 && BE_ESCADENA == 0)
     { 
      $or_boton_reservar_mobile = BE_ESCADENA == 1 ? JText::_('TPL_OPENROOM_BE_SEARCH_MULTIHOTEL') : JText::_('TPL_OPENROOM_BE_SEARCH_HOTEL'); ?>
      <a class="reservar" href="<?php echo $mobileappurl; ?>" title="<?php echo $or_boton_reservar_mobile; ?>" target="reservas"><?php // ENVIAR  ?>
        <?php 
          echo $or_boton_reservar_mobile;
          $or_icon_reservar_mobile = BE_ESCADENA == 1 ? 'bed' : 'calendar'; 
        ?>
        <i class="oricon-<?php echo $or_icon_reservar_mobile; ?>"></i>
     </a>
     <?php }
     else
     { ?>
    <div class="reservar" onclick="return be_openBooking();"><?php // ENVIAR  ?>
        <?php $or_boton_reservar_mobile = BE_ESCADENA == 1 ? JText::_('TPL_OPENROOM_BE_SEARCH_MULTIHOTEL') : JText::_('TPL_OPENROOM_BE_SEARCH_HOTEL'); ?>
        <input type="button" id="mobile-reservar" class="uk-button uk-button-primary b-send" value="<?php echo $or_boton_reservar_mobile; ?>">
        <?php $or_icon_reservar_mobile = BE_ESCADENA == 1 ? 'bed' : 'calendar'; ?>
        <i class="oricon-<?php echo $or_icon_reservar_mobile; ?>"></i>
    </div>
    <?php
    } 
    if($or_nav_extras_content != "") { ?>
      <div class="ventajas_exclusivas_mobile"><?php echo $or_nav_extras_content; ?></div>
    <?php } ?>
   </div>
   <?php $cadenaCSS = BE_ESCADENA == 1 ? " esCadena" : ""; ?>
  <div class="sticky-buscador" <?php /*uk-sticky="top: 0; animation: uk-animation-slide-top; media: 639"*/ ?>>
		<?php /*<form class="uk-form bh<?php echo $cadenaCSS; ?>" action="" id="buscador_reserva" onsubmit="return be_checkAction();" target="reservas" method="post">*/ ?>
    <?php
    //echo "Multihotel: " . print_r($multihotel->returnTitles());
    if(!empty($multihotel->returnTitles()[$webapp_lang[0]]) 
      && count($multihotel->returnTitles()[$webapp_lang[0]]) > 0)
    {
      echo '<div class="only_mobile">';
      foreach($multihotel->returnTitles()[$webapp_lang[0]] as $tag => $content)
      {
        echo '<'.$tag.'>';
          echo $content;
        echo '</'.$tag.'>';
      }
      echo '</div>';
    }
      //echo (count($multihotel->returnTitles()) > 0) && !empty($multihotel->returnTitles()[$webapp_lang[0]]) 
       // ? '<div class="only_mobile">'.$multihotel->returnTitles()[$webapp_lang[0]].'</div>'
       // : '';
    ?>
    <form class="uk-form bh<?php echo $cadenaCSS; ?>" action="" id="buscador_reserva" target="reservas" method="post">
      <?php
      if(BE_ESCADENA == 1)
      {
       ?>
       <input type="hidden" name="frm_iscadena" value="1" />
       <div class="header-search uk-grid-small" uk-grid>
       <div class="uk-form-div hoteles uk-width-1-2@s hotel-sel-con uk-first-column">
          <div class="con">
            <span><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_0'); ?></span>
            <select class="uk-select" id="hotel-sel">
              <?php /*<option value="<?php echo BE_ID_PORTAL; ?>"><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_0'); ?></option>*/
             
              //$or_jsonHotelList = $multihotel->getList();
              foreach($or_jsonHotelList as $id => $array)
              {
                $preText = is_array($array) ? $array['pre'] : 0;
                $optionclass = $preText == 1 ? ' class="parentOption" ' : ' class="childOption" ';
                $espaciar = $preText == 1 ? '&nbsp;&nbsp;' : '&nbsp;&nbsp;&nbsp;&nbsp;';
                $nombre = !empty($array['nombre'][$webapp_lang[0]]) ? $array['nombre'][$webapp_lang[0]] : $array;

                $optionSeleceted = "";
                if(count($array['default'])>0)
                {
                    foreach($array['default'] as $a)
                    {
                      $optionSeleceted = strpos($_SERVER['REQUEST_URI'], $a) !== false ? ' selected="selected" ' : $optionSeleceted;
                    }
                }

               ?>
               <option 
                  value="<?php echo $id; ?>" <?php echo $optionSeleceted . $optionclass; ?> 
                  <?php
                    echo ' data-pre="'.$preText.'" ';
                    echo ' data-portal="'.$array['portalweb'].'" ';
                    echo ' data-id="'.$array['hotelid'].'" ';
                    echo ' data-adult="'.$array['adult'].'" ';
                    echo ' data-app="'.$array['app'].'" ';
                    echo ' data-kids="'.$array['kids'].'" ';
                    echo ' data-age="'.$array['age'].'" ';
                    echo ' data-rooms="'.$array['rooms'].'" ';
                    echo ' data-checkdispo="'.$array['checkdispo'].'" ';                    
                  ?>
                  ><?php echo $espaciar.$nombre; ?>&nbsp;&nbsp;</option>
               <?php
              }
              ?>
            </select>
          </div>
        </div>
       <?php
      }
      else
      {
       ?>
       <input type="hidden" name="frm_iscadena" value="0" />
       <input type="hidden" id="hotel-sel" name="hotel-sel" value="<?php echo BE_ID_PORTAL; ?>" />
       <div class="header-search uk-grid-small" uk-grid><?php
      }
      
      // FIN SELECCIÓN CADENA ?>

        <div class="uk-form-div uk-width-1-2@s dates">
          <div class="ida-vuelta">
            <div class="con">
              <span id="rangepicker_title"><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_11'); ?></span>
              <input type="text" id="rangepicker" class="daterange" name="daterange" readonly />
              <input type="hidden" id="day-ida-hidden" class="required">
              <input type="hidden" id="day-vuelta-hidden" class="required">
            </div>
          </div>      
        </div><?php // FIN ENTRADA // SALIDA ?>

        <div class="uk-form-div uk-width-1-2@s rooms"><?php // HABITACIONES ?>
          <div class="con">
            <div class="hab-value">&nbsp;</div>
            <div uk-dropdown="mode: click" class="b-beds">
              <div class="uk-width-1-1 hv-title">
                <span><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_4'); ?></span>
              </div>
              <div class="counter-container beds-counter" id="habitaciones">
                <i class="icon less"></i>
                <div class="counter">1</div> 
                <i class="icon more"></i>
              </div>
              <div class="b-more-beds">
                <div uk-grid class="uk-grid-collapse"> 
                  <span class="bmb-title uk-width-1-1"><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_4_1'); ?> 1</span>
                  <div class="uk-width-expand">
                    <span><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_4_2'); ?></span>
                    <div class="counter-container" id="adultos_hab_1_1">
                      <i class="icon less"></i>
                      <div class="counter ac-item">2</div> 
                      <i class="icon more"></i>
                    </div>
                  </div>
                  <div class="uk-width-expand">
                    <span><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_4_3'); ?></span>
                    <div class="counter-container kids-counter" data-ninos-sel="1_1" id="ninos_hab_1_1">
                      <i class="icon less"></i>
                      <div class="counter kc-item">0</div>
                      <i class="icon more"></i>
                    </div>
                  </div>
                </div>
                <div uk-grid class="uk-grid-collapse">
                  <div class="uk-width-1-1 mt-0">
                    <div class="bmb-kids-cont-1_1 bmb-kids-cont" uk-grid></div>
                  </div>
                </div>
              </div>
              <span class="uk-button uk-button-primary bb-close uk-dropdown-close uk-width-1-1"><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_12'); ?></span> 
            </div>
            <span class="b-title hab-num"><span class="ac-counter">2</span> <?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_4_2'); ?></span>

          </div>
        </div><?php // FIN HABITACIONES ?>

        <div class="uk-form-div uk-width-1-2@s reservas"><?php // MIS RESERVAS  ?>
          <div class="con">
            <div class="promo">
              <input type="text" class="b-voucher-input" placeholder="<?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_9'); ?>" id="b-voucher-input">
              <?php /*<small><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_6'); ?></small> */ ?>
            </div>
          </div>
        </div>

        <div class="uk-form-div uk-width-1-2@s enviar"><?php // ENVIAR  ?>
          <input type="submit" id="reservar" onclick="return be_checkAction();" class="uk-button uk-button-primary b-send" value="<?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_8'); ?>">
        </div>
        <?php if(defined('BE_MYBOOKINGS') && BE_MYBOOKINGS == 1){ ?>
        <a class="b-book uk-position-bottom-right" onclick="return be_b_book();" target="_mybookings"><?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_7'); ?></a>
        <?php } ?>
      </div>
    </form>
  </div>
</div> <!-- /buscador -->

<?php 
if(BE_CHECKDISPO == 1)
{
  echo '<div id="noDispoPopUp" class="ormodal_cajetin none" rel-portal="'.BE_ID_PORTAL.'" rel-hotel="'.BE_ID_HOTEL.'" rel-redirect="'.BE_NODSIPOREDIRECT.'">';
    echo '<div class="ormodal-content">';
    echo '<div class="ormodal-body">';
      echo '<p class="bold">'. JText::_('TPL_OPENROOM_BE_NODISPO').'</p>';
      if(BE_NODSIPOREDIRECT == 1) { echo '<p>'.JText::_('TPL_OPENROOM_BE_NODISPO_REDIRECT').'</p>'; }
    echo '</div>';
    echo '<div class="ormodal-footer">';
    
    echo '</div>';
    echo '</div>';
  echo '</div>';
}
?>
