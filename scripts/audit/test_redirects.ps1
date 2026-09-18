$testCases = @(
    @{ url = 'http://localhost:3000/mdv'; expected = '/catalog/mdv' },
    @{ url = 'http://localhost:3000/amston'; expected = '/catalog/amston' },
    @{ url = 'http://localhost:3000/dahatsu'; expected = '/catalog/dahatsu' },
    @{ url = 'http://localhost:3000/hunberg'; expected = '/catalog/hunberg' },
    @{ url = 'http://localhost:3000/katalogh'; expected = '/catalog' },
    @{ url = 'http://localhost:3000/uslughi'; expected = '/installation' },
    @{ url = 'http://localhost:3000/kontakty'; expected = '/#contacts' },
    @{ url = 'http://localhost:3000/o_kompanii'; expected = '/#warranty' },
    @{ url = 'http://localhost:3000/vladivostok'; expected = '/' },
    @{ url = 'http://localhost:3000/catalog/mdv-classic-inverter'; expected = '/catalog/mdv' },
    @{ url = 'http://localhost:3000/catalog/non-existing-product-xyz'; expected = '404' }
)

foreach ($tc in $testCases) {
    try {
        $req = [System.Net.HttpWebRequest]::Create($tc.url)
        $req.AllowAutoRedirect = $false
        $res = $req.GetResponse()
        $status = [int]$res.StatusCode
        $loc = $res.Headers['Location']
        Write-Host "[$status] $($tc.url) -> $loc"
        $res.Close()
    } catch [System.Net.WebException] {
        $status = [int]$_.Response.StatusCode
        Write-Host "[$status] $($tc.url) (Expected: $($tc.expected))"
    }
}
