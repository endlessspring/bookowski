use cocoa::appkit::{NSWindow, NSWindowStyleMask};
use tauri::{Runtime, Window,Manager, Size, LogicalSize};
pub trait WindowExt {
  #[cfg(target_os = "macos")]
  fn set_transparent_titlebar(&self, transparent: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
  #[cfg(target_os = "macos")]
  fn set_transparent_titlebar(&self, transparent: bool) {
    use cocoa::appkit::NSWindowTitleVisibility;

    unsafe {
      let id = self.ns_window().unwrap() as cocoa::base::id;

      let mut style_mask = id.styleMask();
      style_mask.set(
        NSWindowStyleMask::NSFullSizeContentViewWindowMask,
        transparent,
      );
      id.setStyleMask_(style_mask);

      id.setTitleVisibility_(if transparent {
        NSWindowTitleVisibility::NSWindowTitleHidden
      } else {
        NSWindowTitleVisibility::NSWindowTitleVisible
      });
      id.setTitlebarAppearsTransparent_(if transparent {
        cocoa::base::YES
      } else {
        cocoa::base::NO
      });
    }
  }
}

fn main() {
  tauri::Builder::default()
      .setup(|app| {
        let win = app.get_window("main").unwrap();
        // win.set_transparent_titlebar(true);
        win.set_min_size(Option::Some(Size::Logical(LogicalSize { width: 1030.0, height: 600.0 }))).unwrap();
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}