$urls = @{
    'home' = 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/';
    'mdv' = 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/mdv';
    'amston' = 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/amston';
    'hunberg' = 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/hunberg';
    'dahatsu' = 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/dahatsu'
}

foreach ($key in $urls.Keys) {
    try {
        $res = Invoke-WebRequest -Uri $urls[$key] -UseBasicParsing
        $res.Content | Out-File -FilePath ("old_site_$key.html") -Encoding utf8
        Write-Host "Success: $key (Length: $($res.Content.Length))"
    } catch {
        Write-Host "Error for $key : $_"
    }
}
