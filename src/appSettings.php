<?php
// This is the recommended means to get appSettings from azure.

// $appSettings = [];

// foreach ($_SERVER as $key => $value) {

//     if(preg_match('/^APPSETTING_/', $key)) {
//         $appSettings[str_replace('APPSETTING_', '', $key)] = $value;
//     }
// }

// header('Content-Type: application/json');
// echo json_encode($appSettings);


$appSettings = [];

foreach ($_SERVER as $key => $value) {
    // Limit the scope of this appsettings request to ONLY the name of the deployment slot: Development, Test, Stage, Production
    if ($key === 'APPSETTING_ASPNETCORE_ENVIRONMENT') {
        $appSettings['ASPNETCORE_ENVIRONMENT'] = $value;
    }
}

header('Content-Type: application/json');
echo json_encode($appSettings);