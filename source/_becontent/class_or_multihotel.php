<?php


class or_multihotel
{
    private $jsonData;
    private $jsonTitles;
    private $onlyDates;
    public function __construct()
    {
        $this->jsonData = json_decode(BE_LISTAHOTELES, true);
        $this->jsonTitles = json_decode('{'.BE_TITLEINMOBILE.'}', true);
    }

    public function isMultihotel(){ return count($this->jsonData) > 0 ? true : false; }
    public function returnDates(){ return $this->onlyDates; }
    public function returnTitles(){ return $this->jsonTitles; }
    public function getList()
    {
        $salida = array();
        $this->onlyDates = '';
        foreach($this->jsonData as $id => $array)
        {
            if($this->onlyDates == ''){ $this->onlyDates .= '\'{'; }
            else{ $this->onlyDates .= ','; }
            $this->onlyDates .= '"' . count($salida) . '": { ';

            if(is_array($array) && count($array['fechas']) > 0)
            {
                $first = 0;
                foreach($array['fechas'] as $valores)
                {
                    $this->onlyDates .= $first == 0 ? '"'.$first.'": {' : ',"'.$first.'": {';
                        $this->onlyDates .= '"in": "'.$valores['in'].'",';
                        $this->onlyDates .= '"out": "'.$valores['out'].'"';
                    $this->onlyDates .= '}';
                    $first++;
                }
            }
            
            $this->onlyDates .= ' } ';

            $tmp = array();
            $tmp['portalweb'] = is_array($array) ? intval($array['portalweb']) : $id;
            $tmp['nombre'] = is_array($array) ? $array['nombre'] : $array;
            /*** HASTA AQUÍ PRINCIPAL */
            $tmp['adult'] = is_array($array) ? intval($array['adult']) : 0;
            $tmp['app'] = is_array($array) ? intval($array['app']) : 0;
            $tmp['fechas'] = is_array($array) ? $array['fechas'] : [];
            $tmp['kids'] = is_array($array) ? intval($array['kids']) : 5;
            $tmp['checkdispo'] = is_array($array) ? intval($array['checkdispo']) : 0;
            $tmp['pre'] = is_array($array) ? $array['pre'] : "";
            $tmp['hotelid'] = is_array($array) ? intval($array['hotelid']) : 0;
            $tmp['default'] = is_array($array) ? $array['default'] : [];
            $salida[] = $tmp;
        }
        
        if($this->onlyDates != ''){ $this->onlyDates .= '}\''; }
        return $salida;
        
    }
}


?>