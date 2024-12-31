package customfyne

import (

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/widget"
)

type CustomEntry struct {
	widget.Entry
	list     *widget.List
	SelectedIdx int
}

func NewEntry(list *widget.List) *CustomEntry {
	entry := &CustomEntry{
    list: list,
    SelectedIdx: 0,
  }
	entry.ExtendBaseWidget(entry)
	return entry
}

func (c *CustomEntry) TypedKey(key *fyne.KeyEvent) {
	switch key.Name {
	case fyne.KeyDown:
    if c.SelectedIdx < c.list.Length() - 1 {
      c.SelectedIdx++
      c.list.Select(c.SelectedIdx)
    }
	case fyne.KeyUp:
    if c.SelectedIdx > 0 {
      c.SelectedIdx--
      c.list.Select(c.SelectedIdx)
    }
	default:
		c.Entry.TypedKey(key)
	}
}
