<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_custom
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

//echo $module->content;

?>
<iframe class="<?php echo $moduleclass_sfx; ?>" src="<?php echo str_replace('<p>', '', str_replace('</p>', '',$module->content)); ?>" width="100%" height="" frameborder="0" style="border:0;" allowfullscreen=""></iframe>