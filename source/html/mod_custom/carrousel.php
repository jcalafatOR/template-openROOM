<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_custom
 *
 * @copyright   Copyright (C) 2019 - 2020 openROOM. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 *
 * Carga de fotos:
 *  - Elige una foto de fondo, se convertirá en la primera foto del carrousel.
 *  - NOTA: Todas las fotos que estén en esa carpeta se cargarán en el listado de fotos.
 *  - IMPORTANTE: La Carpeta que contiene las imágenes no puede tener subcarpetas.
 * Special Clases:
 *  - .tolist -> Los botones de navegación afectarán al listado de fotos en lugar de al carrousel
 *  - .autoStart -> (Próximamente) El carrousel avanza a la siguiente foto automáticamente
 */

defined('_JEXEC') or die;
$active = JFactory::getApplication()->getMenu()->getActive();

$fotoInicial = $params->get('backgroundimage');
$tmp_FotoInicial = explode("/",$fotoInicial);
array_pop($tmp_FotoInicial);
$or_customCarrousel_dir = implode('/', $tmp_FotoInicial);
$or_customCarrousel_mainPhotoName = str_replace($or_customCarrousel_dir.'/', '', $fotoInicial);
$or_customCarrousel_photoList = scandir($or_customCarrousel_dir);
?>

<div class="or_customCarrousel <?php echo $moduleclass_sfx; ?>" >
<div class="or_blockwidth" >
	<?php if($module->content != "") { ?>
	<div class="or_customCarrouselText">
	<?php echo $module->content; ?>
	</div>
	<?php } ?>
	<?php if ($params->get('backgroundimage')) { ?>
	<div class="or_customCarrouselContent">
		<div class="or_customCarrouselPhoto">
			<div rel="1"><img src="<?php echo $params->get('backgroundimage'); ?>" alt="<?php echo $active->title; ?> - 1" /></div>
		</div>
		<div class="or_customCarrouselPhotoList">
			<div class="or_customCarrouselItem selected" rel="1"><img src="<?php echo $params->get('backgroundimage'); ?>" alt="<?php echo $active->title; ?> - 1" /></div>
			<?php
			$count = 2;
			foreach($or_customCarrousel_photoList as $or_customCarrousel_photoItem)
			{
				if($or_customCarrousel_photoItem != "." && $or_customCarrousel_photoItem != ".." && $or_customCarrousel_photoItem != $or_customCarrousel_mainPhotoName && substr($or_customCarrousel_photoItem,-4) != 'webp' && substr($or_customCarrousel_photoItem,-2) != 'db')
				{
					echo '<div class="or_customCarrouselItem" rel="'.$count.'"><img src="'.$or_customCarrousel_dir.'/'.$or_customCarrousel_photoItem.'" alt="'.$active->title.' - '.$count.'" /></div>';
					$count++;
				}
			}
			?>
		</div>
		<div class="or_customCarrouselMove"><span class="or_prev"></span><span class="or_next"></span></div>
	</div>
	<?php } ?>
</div>
</div>