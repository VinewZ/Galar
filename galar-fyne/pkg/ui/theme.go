package ui

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/theme"
)

type GalarTheme struct {
  fyne.Theme
}

func NewGalarTheme() fyne.Theme {
  return &GalarTheme{Theme: theme.DefaultTheme()}
}

func (g *GalarTheme) Color(name fyne.ThemeColorName, _ fyne.ThemeVariant) color.Color {
  switch name {
  case theme.ColorNameBackground:
    return color.RGBA{R: 0, G: 0, B: 0, A: 1}
  }
  return g.Theme.Color(name, theme.VariantDark)
}

func (g *GalarTheme) Size(name fyne.ThemeSizeName ) float32 {
  if name == theme.SizeNameText {
    return 12
  }

  return g.Theme.Size(name)
}
