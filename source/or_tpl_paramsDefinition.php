<?php
// Cargamos los parámetros del Template y los asignamos a constantes PHP para su uso
class or_tplParams
{
	protected $or_params;
	
	public function __construct()
	{
		$this->or_params = $this->arrayData();
		foreach($this->or_params as $or_paramName => $or_paramValue)
		{
			switch($or_paramName)
			{
				case "BE_LISTAHOTELES":
					defined(strtoupper($or_paramName)) or define(strtoupper($or_paramName), '{'.$or_paramValue.'}');
					break;
				/*case "BE_CLOSINGDATE_1_INI":
				case "BE_CLOSINGDATE_1_END":
				case "BE_CLOSINGDATE_2_INI":
				case "BE_CLOSINGDATE_2_END":
				case "BE_CLOSINGDATE_3_INI":
				case "BE_CLOSINGDATE_3_END":
					if($or_paramValue != "")
					{
						$tmpDate = explode("-",$or_paramValue);
						if(count($tmpDate) >= 3)
						{
							defined(strtoupper($or_paramName)) or define(strtoupper($or_paramName), $tmpDate[2]."-".$tmpDate[1]."-".$tmpDate[0]);
						}
					}
					break;*/
				default:
					defined(strtoupper($or_paramName)) or define(strtoupper($or_paramName), $or_paramValue);
					break;
			}
		}
	}
	
	public function rParams(){ return $this->or_params; }
	public static function getParam($name)
	{
		$tmp = new or_tplParams();
		$or_params = $tmp->rParams();
		$rs = isset($or_params[$name]) ? $rs : "";
		//return $rs;
		return $or_params;
	}
	
	protected function arrayData()
	{
		$or_paramsGetApp = JFactory::getApplication();
		$or_paramsGetDoc= JFactory::getDocument();
		
		//echo 'template = ' . $or_paramsGetDoc->template . '<br />';
		//echo 'language = ' . $or_paramsGetDoc->language . '<br />';
		
		$or_paramsGetParams = $or_paramsGetApp->getTemplate(true)->params;
		$or_paramsGetParams	= $or_paramsGetParams->toArray();
		return $or_paramsGetParams;
	}
	
}

