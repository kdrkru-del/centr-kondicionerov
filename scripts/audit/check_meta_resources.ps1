try {
    $r = Invoke-WebRequest -Uri 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/robots.txt' -UseBasicParsing
    Write-Host '=== ROBOTS.TXT ==='
    Write-Host $r.Content
} catch {
    Write-Host "Robots.txt error: $_"
}

try {
    $s = Invoke-WebRequest -Uri 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/sitemap.xml' -UseBasicParsing
    Write-Host '=== SITEMAP.XML ==='
    Write-Host $s.Content
} catch {
    Write-Host "Sitemap.xml error: $_"
}

try {
    $k = Invoke-WebRequest -Uri 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/kontakty' -UseBasicParsing
    Write-Host '=== KONTAKTY PAGE ==='
    Write-Host "Length: $($k.Content.Length)"
    $k.Content | Out-File -FilePath 'old_site_kontakty.html' -Encoding utf8
} catch {
    Write-Host "Kontakty error: $_"
}
