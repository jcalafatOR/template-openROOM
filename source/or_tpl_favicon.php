<?php
if(file_exists('apple-icon-57x57.png')){ echo '<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">'; }
if(file_exists('apple-icon-60x60.png')){ echo '<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">'; }
if(file_exists('apple-icon-72x72.png')){ echo '<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">'; }
if(file_exists('apple-icon-76x76.png')){ echo '<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">'; }
if(file_exists('apple-icon-114x114.png')){ echo '<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">'; }
if(file_exists('apple-icon-120x120.png')){ echo '<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">'; }
if(file_exists('apple-icon-144x144.png')){ echo '<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">'; }
if(file_exists('apple-icon-152x152.png')){ echo '<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">'; }
if(file_exists('apple-icon-180x180.png')){ echo '<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">'; }
if(file_exists('android-icon-192x192.png')){ echo '<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">'; }
if(file_exists('favicon-32x32.png')){ echo '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">'; }
if(file_exists('favicon-96x96.png')){ echo '<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">'; }
if(file_exists('favicon-16x16.png')){ echo '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">'; }

if(file_exists('manifest.json')){ echo '<link rel="manifest" href="/manifest.json">'; }

if(file_exists('ms-icon-144x144.png')){
echo '<meta name="msapplication-TileColor" content="#ffffff">';
echo '<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">';
echo '<meta name="theme-color" content="#ffffff">'; }