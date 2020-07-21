<?php
if(!class_exists('openroom_basics'))
{
	class openroom_basics
	{
		
		public function __construct()
		{
			
		}
		public function or_filemtime($file)
		{
			$mtime = filemtime($file);
			$rs = $mtime ? "?v=".$mtime : "?v=".time();
			return $rs;
		}
	}
}