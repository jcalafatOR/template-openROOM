<?php
class or_mobExtraButton
{
	protected $parametros;
	protected $contenido;
	protected $css;
	protected $hasExtra;
	
	public function __construct()
	{
		$this->parametros = $this->arrayData();
		$this->hasExtra = isset($this->parametros['OR_NAVEXTRA']) && $this->parametros['OR_NAVEXTRA'] == 1 ? true : false;
		$this->css = isset($this->parametros['OR_NAVEXTRA_CSS']) && $this->hasExtra ? $this->parametros['OR_NAVEXTRA_CSS'] : "";
		$this->contenido = $this->hasExtra ? '<span class="or_extra_container">'.JText::_('TPL_OPENROOM_NAVEXTRA_TEXTO').'</span>' : "";
	}
	
	public function getCss(){ return $this->css; }
	public function getContent(){ return $this->contenido; }
		
	protected function arrayData()
	{
		$or_paramsGetApp = JFactory::getApplication();
		
		$or_paramsGetParams = $or_paramsGetApp->getTemplate(true)->params;
		$or_paramsGetParams	= $or_paramsGetParams->toArray();
		return $or_paramsGetParams;
		
	}
}