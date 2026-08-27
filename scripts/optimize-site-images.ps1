param(
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

function Save-OptimizedJpeg {
  param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Destination,
    [Parameter(Mandatory = $true)][int]$MaxWidth,
    [Parameter(Mandatory = $true)][int]$MaxHeight,
    [int]$Quality = 82
  )

  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $widthScale = [double]$MaxWidth / [double]$sourceImage.Width
    $heightScale = [double]$MaxHeight / [double]$sourceImage.Height
    $scale = [Math]::Min([double]1, [Math]::Min($widthScale, $heightScale))
    $width = [Math]::Max(1, [int][Math]::Round($sourceImage.Width * $scale))
    $height = [Math]::Max(1, [int][Math]::Round($sourceImage.Height * $scale))
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    try {
      $bitmap.SetResolution(96, 96)
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($sourceImage, 0, 0, $width, $height)
      } finally {
        $graphics.Dispose()
      }

      $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
      $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
      $directory = Split-Path -Parent $Destination
      if (-not (Test-Path -LiteralPath $directory)) { New-Item -ItemType Directory -Path $directory | Out-Null }
      $bitmap.Save($Destination, $codec, $parameters)
      $parameters.Dispose()
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }
}

function Save-TopPreviewJpeg {
  param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Destination
  )

  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $cropHeight = [Math]::Min($sourceImage.Height, [int][Math]::Round($sourceImage.Width * 1.25))
    $bitmap = New-Object System.Drawing.Bitmap(320, 400)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $sourceRectangle = New-Object System.Drawing.Rectangle(0, 0, $sourceImage.Width, $cropHeight)
        $destinationRectangle = New-Object System.Drawing.Rectangle(0, 0, 320, 400)
        $graphics.DrawImage($sourceImage, $destinationRectangle, $sourceRectangle, [System.Drawing.GraphicsUnit]::Pixel)
      } finally {
        $graphics.Dispose()
      }
      $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
      $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]80)
      $bitmap.Save($Destination, $codec, $parameters)
      $parameters.Dispose()
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }
}

$certificateDir = Join-Path $ProjectRoot 'assets\certificates'
Get-ChildItem -LiteralPath $certificateDir -Filter '*.jpg' | Where-Object { $_.BaseName -notlike '*-web' } | ForEach-Object {
  $destination = Join-Path $_.DirectoryName ($_.BaseName + '-web.jpg')
  Save-OptimizedJpeg -Source $_.FullName -Destination $destination -MaxWidth 900 -MaxHeight 1300 -Quality 82
}

$exhibitionDir = Join-Path $ProjectRoot 'assets\exhibitions'
Get-ChildItem -LiteralPath $exhibitionDir -Filter '*.jpg' | Where-Object { $_.BaseName -notlike '*-web' } | ForEach-Object {
  $destination = Join-Path $_.DirectoryName ($_.BaseName + '-web.jpg')
  Save-OptimizedJpeg -Source $_.FullName -Destination $destination -MaxWidth 1600 -MaxHeight 1200 -Quality 82
}

$manualSource = Join-Path $ProjectRoot 'assets\manuals\b71\B71-en-preview.jpg'
$manualDestination = Join-Path $ProjectRoot 'assets\manuals\b71\B71-en-preview-thumb.jpg'
Save-TopPreviewJpeg -Source $manualSource -Destination $manualDestination

Write-Output 'Generated web-optimized image derivatives without modifying source images.'
