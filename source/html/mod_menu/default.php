<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_menu
 *
 * @copyright   Copyright (C) 2019 - 2020 open ROOM. All rights reserved.
 * @license     GNU/GPL License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$id = '';
$or_paramsGetApp = JFactory::getApplication();
if ($tagId = $params->get('tag_id', ''))
{
	$id = ' id="' . $tagId . '"';
}

// Cargamos la función que nos devolverá los datos encesarios
$or_nav_extras_css = "";
$or_nav_extras_content = "";
if(file_exists(__DIR__ . '/clases/class_or_extraButton.php'))
{
	require_once __DIR__ . '/clases/class_or_extraButton.php';
	$or_nav_extras = new or_extraButton();
	$or_nav_extras_css = $or_nav_extras->getCss();
	$or_nav_extras_content = $or_nav_extras->getContent();
}

$or_paramsGetParams = $or_paramsGetApp->getTemplate(true)->params;
$or_paramsGetParams	= $or_paramsGetParams->toArray();

// The menu class is deprecated. Use nav instead
echo '<div class="or-nav-container">';
if(isset($or_paramsGetParams['OR_LOGOFILE']))
{
	$orLogo_lang = JFactory::getLanguage();
	$orLogo_languages = JLanguageHelper::getLanguages('lang_code');
	$orLogo_languageCode = $orLogo_languages[ $orLogo_lang->getTag() ]->sef;
   ?>
	<div class="or-nav-menu or-nav-logo"><a href="<?php echo $orLogo_languageCode . '/' ; ?>" title="<?php echo $or_paramsGetParams['OR_SITETITLE']; ?>"><img alt="<?php echo $or_paramsGetParams['OR_SITETITLE']; ?>" src="<?php echo $or_paramsGetParams['OR_LOGOFILE']; ?>" /></a></div>
	<?php
}//else{ echo print_r(or_tplParams::getParam('OR_LOGOFILE')) . ' <- OR_LOGOFILE'; }
?>
<div class="or-nav-container-block">
<div class="or-nav-menu or-nav-burger"><i class="oricon-burger"></i></div>
<div class="or-nav-menu or-nav-extras" rel="<?php echo $or_nav_extras_css; ?>"><?php echo $or_nav_extras_content; ?></div>
<div class="or-nav-menu or-nav-booking none">
	<input type="button" id="modal-reservas" onclick="return be_openBooking();" class="uk-button uk-button-primary b-send" value="<?php echo JText::_('TPL_OPENROOM_BE_BUSCADOR_8'); ?>">
</div>
<ul class="or-nav-menu-display menu<?php echo $class_sfx; ?> mod-list"<?php echo $id; ?>>
	<span class="nav-close"><i class="oricon-close"></i></span>
<?php foreach ($list as $i => &$item)
{
	$class = 'item-' . $item->id;

	if ($item->id == $default_id)
	{
		$class .= ' default';
	}

	if ($item->id == $active_id || ($item->type === 'alias' && $item->params->get('aliasoptions') == $active_id))
	{
		$class .= ' current';
	}

	if (in_array($item->id, $path))
	{
		$class .= ' active';
	}
	elseif ($item->type === 'alias')
	{
		$aliasToId = $item->params->get('aliasoptions');

		if (count($path) > 0 && $aliasToId == $path[count($path) - 1])
		{
			$class .= ' active';
		}
		elseif (in_array($aliasToId, $path))
		{
			$class .= ' alias-parent-active';
		}
	}

	if ($item->type === 'separator')
	{
		$class .= ' divider';
	}

	if ($item->deeper)
	{
		$class .= ' deeper';
	}

	if ($item->parent)
	{
		$class .= ' parent';
	}

	echo '<li class="' . $class . '">';

	switch ($item->type) :
		case 'separator':
		case 'component':
		case 'heading':
		case 'url':
			require JModuleHelper::getLayoutPath('mod_menu', 'default_' . $item->type);
			break;

		default:
			require JModuleHelper::getLayoutPath('mod_menu', 'default_url');
			break;
	endswitch;

	// The next item is deeper.
	if ($item->deeper)
	{
		echo '<ul class="nav-child unstyled small">';
	}
	// The next item is shallower.
	elseif ($item->shallower)
	{
		echo '</li>';
		echo str_repeat('</ul></li>', $item->level_diff);
	}
	// The next item is on the same level.
	else
	{
		echo '</li>';
	}
}
?>
<?php
// OPEN ROOM ADDITION: Si hay Multilang...
$or_temp_addingLangsdrop = "";
$or_temp_addingLangs = "";
if(JLanguageMultilang::isEnabled())
{
	$current_lang_tag = JFactory::getLanguage()->getTag();	// Current LANG
  	$current_lang_tag_name = explode('-',$current_lang_tag);	// Contenido
	
	$or_temp_addingLangsdrop = '<div class="or-nav-menu or-drop-langlist no_mobile" rel-dep="0">'.$current_lang_tag_name[0].'</div>';
  	/*** OR MENU LANG LIST ***/
    $or_temp_app  = JFactory::getApplication();	// Current data
    $or_temp_menu = $or_temp_app->getMenu()->getActive()->id;	// Current ID
    $current_lang_tag = JFactory::getLanguage()->getTag();	// Current LANG

    $or_currentID = JRoute::_($or_temp_menu);
    $referal_assoc_rel = array();
	// Si es la HOME no indica idioma.
    if(JRoute::_($or_temp_app->getMenu()->getActive()->home) == 1)	// HOME
    {
      $current_lang_tag = JFactory::getLanguage()->getTag();
      // Cargamos nueva búsqueda para la home
      $or_temp_db_lang = JFactory::getDbo();
      // Iniciamos variable contenedora de la llamada
      $or_query_lang = $or_temp_db_lang->getQuery(true);
      // Elegimos items a buscar
      $or_query_lang->select($or_temp_db_lang->quoteName(array('sef', 'title')));
      $or_query_lang->from($or_temp_db_lang->quoteName('#__languages'));
      $or_query_lang->where($or_temp_db_lang->quoteName('lang_code').' != "'.$current_lang_tag.'" AND '.$or_temp_db_lang->quoteName('published').' = 1');
      $or_temp_db_lang->setQuery($or_query_lang);
      $referal_assoc_rel = $or_temp_db_lang->loadObjectList();
    }
    else
    {
      // Get a db connection.
      $or_temp_db = JFactory::getDbo();

      // Create a new query object.
      $or_query = $or_temp_db->getQuery(true);

      // Select all records from the user profile table where key begins with "custom.".
      // Order it by the ordering field.
      $or_query->select($or_temp_db->quoteName(array('id', 'key')));
      $or_query->from($or_temp_db->quoteName('#__associations'));
      $or_query->where($or_temp_db->quoteName('id').' = '.$or_currentID);

      // Obtenemos el array de los items asociados a este ID
      $or_temp_db->setQuery($or_query);

      // Cargamos los resultados de los items asociados a este en una lista of stdClass objects (see later for more options on retrieving data).
      // Obtenemos el Key de la página actual
      $referal_assoc = $or_temp_db->loadObjectList();
      // buscamos todos los elementos que comparten Key
      // Create a new query object.
		if(!empty($referal_assoc))
      {
			$or_temp_db_rel = JFactory::getDbo();
			$or_query_rel = $or_temp_db_rel->getQuery(true);
			$or_query_rel->select($or_temp_db_rel->quoteName(array('a.id', 'a.key', 'm.path', 'l.sef', 'l.lang_code', 'm.id', 'm.language', 'm.title', 'l.published' ), array('id', 'key', 'path', 'sef', 'lang_code', 'menu_id', 'langmenu_code', 'title', 'published')));
			$or_query_rel->from($or_temp_db_rel->quoteName('#__associations', 'a'));
			$or_query_rel->join('LEFT', $or_temp_db_rel->quoteName('#__menu', 'm') . ' ON ' . $or_temp_db_rel->quoteName('a.id') . ' = ' . $or_temp_db_rel->quoteName('m.id'));
			$or_query_rel->join('LEFT', $or_temp_db_rel->quoteName('#__languages', 'l') . ' ON ' . $or_temp_db_rel->quoteName('m.language') . ' = ' . $or_temp_db_rel->quoteName('l.lang_code'));
			$or_query_rel->where($or_temp_db_rel->quoteName('a.key').' = "'.$referal_assoc[0]->key.'" AND '.$or_temp_db_rel->quoteName('l.published') . ' = 1 AND '.$or_temp_db_rel->quoteName('m.id') . ' != '.$or_currentID);
			$or_temp_db_rel->setQuery($or_query_rel);
			$referal_assoc_rel = $or_temp_db_rel->loadObjectList();
		}
    }


    /*** SI HAY IDIOMAS ACTIVOS y CONTENIDO A MOSTRAR ***/
    if (count($referal_assoc_rel) > 0)
    {
        // Contenido Personalizado para Open ROOM Template...
     	$or_temp_addingLangs = '<ul class="or-nav-menu-display or_menu_lang_list">';
		$or_temp_addingLangs .= '<li class="or_menu_lang_item only_mobile">'.$current_lang_tag_name[0].'</li>';
		
     	//<ul class="or_menu_lang_list depth_0">
        foreach ($referal_assoc_rel as $assoc_id) 
        {
            $assoc_id->path = isset($assoc_id->path) ? $assoc_id->path : "";
        	$or_temp_addingLangs .= '<li class="or_menu_lang_item"><a href="'.$assoc_id->sef.'/'.$assoc_id->path.'" title="'.$assoc_id->title.'" >'.$assoc_id->sef.'</a></li>';
        }
        $or_temp_addingLangs .= '</ul>';
    } 
}
echo '<div class="only_mobile or-menu-langblock">'.$or_temp_addingLangs.'</div></ul>';
echo $or_temp_addingLangsdrop;
echo $or_temp_addingLangs;
echo '</div>';
echo '</div>';
?>
