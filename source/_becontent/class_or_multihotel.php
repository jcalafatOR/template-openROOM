<?php


class or_multihotel
{
    private $jsonData;

    public function __construct()
    {
        $this->jsonData = json_decode(BE_LISTAHOTELES, true);
    }

    public function isMultihotel(){ return count($this->jsonData) > 0 ? true : false; }

    public function getList()
    {
        $salida = array();
        foreach($this->jsonData as $id => $array)
        {
            $tmp = array();
            $tmp['portalweb'] = is_array($array) ? intval($array['portalweb']) : $id;
            $tmp['nombre'] = is_array($array) ? $array['nombre'] : $array;
            /*** HASTA AQUÍ PRINCIPAL */
            $tmp['adult'] = is_array($array) ? intval($array['adult']) : 0;
            $tmp['app'] = is_array($array) ? intval($array['app']) : 0;
            $tmp['fechas'] = is_array($array) ? $array['fechas'] : array();
            $tmp['kids'] = is_array($array) ? intval($array['kids']) : 5;
            $tmp['checkdispo'] = is_array($array) ? intval($array['checkdispo']) : 0;
            $tmp['pre'] = is_array($array) ? $array['pre'] : "";
            $tmp['hotelid'] = is_array($array) ? intval($array['hotelid']) : 0;
            $salida[] = $tmp;
        }
        
        return $salida;
        
    }
}


?>