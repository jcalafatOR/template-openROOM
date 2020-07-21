<?php
// OPEN ROOM ADDITION: Si hay Multilang...
if(JLanguageMultilang::isEnabled())
{
	$current_lang_tag = JFactory::getLanguage()->getTag();	// Current LANG
  	$current_lang_tag_name = explode('-',$current_lang_tag);	// Contenido
  	/*** OR MENU LANG LIST ***/
    $or_temp_app  = JFactory::getApplication();	// Current data
    $or_temp_menu = $or_temp_app->getMenu()->getActive()->id;	// Current ID
    $current_lang_tag = JFactory::getLanguage()->getTag();	// Current LANG

    $or_currentID = JRoute::_($or_temp_menu);
    $referal_assoc_rel = array();
	$defaultLang = false;
	// Si es la HOME no indica idioma.
    if(JRoute::_($or_temp_app->getMenu()->getActive()->home) == 1)	// HOME
    {
      $current_lang_tag = JFactory::getLanguage()->getTag();
      // Cargamos nueva búsqueda para la home
      $or_temp_db_lang = JFactory::getDbo();
      // Iniciamos variable contenedora de la llamada
      $or_query_lang = $or_temp_db_lang->getQuery(true);
      // Elegimos items a buscar
      $or_query_lang->select($or_temp_db_lang->quoteName(array('sef', 'title', 'lang_code', 'title_native')));
      $or_query_lang->from($or_temp_db_lang->quoteName('#__languages'));
      $or_query_lang->where($or_temp_db_lang->quoteName('published').' = 1');
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
		$or_query_rel->select($or_temp_db_rel->quoteName(array('a.id', 'a.key', 'm.path', 'l.sef', 'l.lang_code', 'm.id', 'm.language', 'm.title', 'l.published', 'l.title_native' ), array('id', 'key', 'path', 'sef', 'lang_code', 'menu_id', 'langmenu_code', 'title', 'published', 'title_native')));
		$or_query_rel->from($or_temp_db_rel->quoteName('#__associations', 'a'));
		$or_query_rel->join('LEFT', $or_temp_db_rel->quoteName('#__menu', 'm') . ' ON ' . $or_temp_db_rel->quoteName('a.id') . ' = ' . $or_temp_db_rel->quoteName('m.id'));
		$or_query_rel->join('LEFT', $or_temp_db_rel->quoteName('#__languages', 'l') . ' ON ' . $or_temp_db_rel->quoteName('m.language') . ' = ' . $or_temp_db_rel->quoteName('l.lang_code'));
		$or_query_rel->where($or_temp_db_rel->quoteName('a.key').' = "'.$referal_assoc[0]->key.'" AND '.$or_temp_db_rel->quoteName('l.published') . ' = 1');
		$or_temp_db_rel->setQuery($or_query_rel);
		$referal_assoc_rel = $or_temp_db_rel->loadObjectList();
	  }
    }


    /*** SI HAY IDIOMAS ACTIVOS y CONTENIDO A MOSTRAR ***/
    if (count($referal_assoc_rel) > 0)
    {
      	$default_lang_tag = JFactory::getLanguage()->getDefault();	// Current LANG
      	
        // Contenido Personalizado para Open ROOM Template...
        foreach ($referal_assoc_rel as $assoc_id) 
        {
            $assoc_id->path = isset($assoc_id->path) ? $assoc_id->path."/" : "";
			//echo '<link rel="alternate" type="text/html" hreflang="'.$assoc_id->lang_code.'" href="/'.$assoc_id->sef.'/'.$assoc_id->path.'" title="'.$assoc_id->title_native.'" />';
			if($assoc_id->lang_code == $default_lang_tag)
			{
		//		echo '<link rel="alternate" href="'.JUri::root().$assoc_id->sef.'/'.$assoc_id->path.'" hreflang="x-default" title="'.$assoc_id->title_native.'" />';
			}
        }
    }
	
}


?>