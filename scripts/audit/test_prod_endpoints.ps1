$urls = @(
    'http://localhost:3000/',
    'http://localhost:3000/catalog',
    'http://localhost:3000/installation',
    'http://localhost:3000/selection',
    'http://localhost:3000/artem',
    'http://localhost:3000/ussuriysk',
    'http://localhost:3000/privacy',
    'http://localhost:3000/compare',
    'http://localhost:3000/catalog/mdv',
    'http://localhost:3000/catalog/amston',
    'http://localhost:3000/catalog/dahatsu',
    'http://localhost:3000/catalog/hunberg',
    'http://localhost:3000/catalog/dahatsu-legend-07',
    'http://localhost:3000/catalog/amston-reykjavik-ash-07',
    'http://localhost:3000/catalog/hunberg-ac-07nb',
    'http://localhost:3000/catalog/mdv-aurora-on-off',
    'http://localhost:3000/robots.txt',
    'http://localhost:3000/sitemap.xml'
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing -MaximumRedirection 0
        Write-Host "[$($res.StatusCode)] $u"
    } catch {
        Write-Host "[ERROR $($_.Exception.Response.StatusCode.value__)] $u"
    }
}
