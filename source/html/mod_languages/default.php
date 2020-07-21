<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_languages
 *
 * @copyright   Copyright (C) 2019 - 2020 Open ROOM. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::_('stylesheet', 'mod_languages/template.css', array('version' => 'auto', 'relative' => true));

if ($params->get('dropdown', 0) && !$params->get('dropdownimage', 1))
{
	JHtml::_('formbehavior.chosen');
}
/*** OR MENU LANG LIST ***/
$or_temp_app  = JFactory::getApplication();	// Current data
$or_temp_menu = $or_temp_app->getMenu()->getActive()->id;	// Current ID
$current_lang_tag = JFactory::getLanguage()->getTag();	// Current LANG

$or_currentID = JRoute::_($or_temp_menu);
$referal_assoc_rel = array();
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


/*****/
if (count($referal_assoc_rel) > 0)
{ ?>
  <div class="mod-languages<?php echo $moduleclass_sfx; ?>">
    <?php  if ($headerText) : ?>
        <div class="pretext"><p><?php echo $headerText; ?></p></div>
    <?php endif; 

        // Contenido Personalizado para Open ROOM Template...
    ?>

    <ul class="or_menu_lang_list depth_0">
        <?php foreach ($referal_assoc_rel as $assoc_id) 
        {
            $assoc_id->path = isset($assoc_id->path) ? $assoc_id->path : "";
            echo '<li class="or_menu_lang_item"><a href="'.$assoc_id->sef.'/'.$assoc_id->path.'" title="'.$assoc_id->title.'" >'.$assoc_id->sef.'</a></li>';
        }
        ?>
    </ul>

    <?php if ($footerText) : ?>
        <div class="posttext"><p><?php echo $footerText; ?></p></div>
    <?php endif; ?>
  </div>
<?php } ?>