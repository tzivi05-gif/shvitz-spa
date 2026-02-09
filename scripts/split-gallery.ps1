$src = "C:\Users\Tzivi Hamburger\.cursor\projects\c-Users-Tzivi-Hamburger-zhvitz-spa\assets\c__Users_Tzivi_Hamburger_AppData_Roaming_Cursor_User_workspaceStorage_0e2f899a82e5d289305037d9f66a9831_images_ChatGPT_Image_Feb_4__2026__07_46_45_AM-fa61653c-af81-4780-930e-2d303ee985af.png"
$outDir = "C:\Users\Tzivi Hamburger\zhvitz-spa\public\images"

Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile($src)
$w = [int]$img.Width
$h = [int]$img.Height
$halfW = [int]($w / 2)
$halfH = [int]($h / 2)

$boxes = @(
  @(0, 0, $halfW, $halfH),
  @($halfW, 0, $halfW, $halfH),
  @(0, $halfH, $halfW, $halfH),
  @($halfW, $halfH, $halfW, $halfH)
)

for ($i = 0; $i -lt 4; $i++) {
  $box = $boxes[$i]
  $bmp = New-Object System.Drawing.Bitmap([int]$box[2], [int]$box[3])
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage(
    $img,
    0,
    0,
    [System.Drawing.Rectangle]::FromLTRB(
      [int]$box[0],
      [int]$box[1],
      [int]($box[0] + $box[2]),
      [int]($box[1] + $box[3])
    ),
    [System.Drawing.GraphicsUnit]::Pixel
  )

  $outPath = Join-Path $outDir ("shvitz-{0}.jpg" -f ($i + 7))
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose()
  $bmp.Dispose()
}

$img.Dispose()
Write-Output "saved"
