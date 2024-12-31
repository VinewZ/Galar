package customfyne

import (
	"fyne.io/fyne/v2"
)

type Mode int

const (
	FILE_EXPLORER = iota
	CURR_CONVERTER
  MATH
)

type MainL struct{
  Mode Mode
}

func (l *MainL) MinSize(objects []fyne.CanvasObject) fyne.Size {
	if len(objects) != 4 {
		return fyne.NewSize(0, 0)
	}
	entrySize := objects[0].MinSize()

	boxSize1 := objects[1].MinSize()
	boxSize2 := objects[2].MinSize()

	listSize := objects[3].MinSize()

	width := fyne.Max(entrySize.Width, boxSize1.Width+boxSize2.Width)
	height := entrySize.Height + fyne.Max(boxSize1.Height, listSize.Height)

	return fyne.NewSize(width, height)
}

func (l *MainL) Layout(objects []fyne.CanvasObject, containerSize fyne.Size) {
	if len(objects) != 4 {
		return
	}

	entry := objects[0]
	entryHeight := entry.MinSize().Height
	entry.Resize(fyne.NewSize(containerSize.Width, entryHeight))
	entry.Move(fyne.NewPos(0, 0))

	box1 := objects[1]
	box2 := objects[2]
	boxHeight := fyne.Max(box1.MinSize().Height, box2.MinSize().Height)
	halfWidth := containerSize.Width / 2


	box1.Resize(fyne.NewSize(halfWidth, boxHeight))
	box1.Move(fyne.NewPos(0, entryHeight))

	box2.Resize(fyne.NewSize(halfWidth, boxHeight))
	box2.Move(fyne.NewPos(halfWidth, entryHeight))

	list := objects[3]
	list.Move(fyne.NewPos(0, entryHeight+boxHeight))
	list.Resize(fyne.NewSize(containerSize.Width, containerSize.Height-entryHeight-boxHeight))
}

func (l *MainL) UpdateLayout(objects []fyne.CanvasObject) {
  if l.Mode == MATH {
    objects[1].Show()
    objects[2].Show()
  } else {
    objects[1].Hide()
    objects[2].Hide()
  }
}

