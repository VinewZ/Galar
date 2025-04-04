VERSION ?= $(shell git describe --tags --abbrev=0)
DIST_DIR = dist
BUILD_DIR = build/bin
RELEASE_FILE = $(DIST_DIR)/galar-$(VERSION).tar.gz

.PHONY: release build clean frontend

release: build
	@echo "📦 Creating release package..."
	mkdir -p dist
	cp build/bin/galar-bin dist/
	cd dist && tar --exclude=galar-$(VERSION).tar.gz -czvf galar-$(VERSION).tar.gz galar-bin
	@echo "🚀 Releasing version $(VERSION) to GitHub..."
	gh release create $(VERSION) \
		dist/galar-bin \
		dist/galar-$(VERSION).tar.gz \
		--title "$(VERSION)" \
		--notes "Release $(VERSION)"
	@$(MAKE) clean

build:
	@echo "🛠️ Building Wails app..."
	wails build -clean

clean:
	@echo "🧹 Cleaning up..."
	rm -rf $(BUILD_DIR) $(DIST_DIR)
