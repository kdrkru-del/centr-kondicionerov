$urls = @('aktsii', 'katalogh', 'uslughi', 'o_kompanii', 'novosti', 'mdvprom');
foreach ($u in $urls) {
    try {
        $r = Invoke-WebRequest -Uri ("https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/" + $u) -UseBasicParsing
        $r.Content | Out-File -FilePath ("old_site_" + $u + ".html") -Encoding utf8
        Write-Host "Success: $u ($($r.Content.Length) bytes)"
    } catch {
        Write-Host "Error for $u : $_"
    }
}
