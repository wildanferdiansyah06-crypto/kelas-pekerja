import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Buku')
        .icon(() => '📚')
        .child(S.documentTypeList('book').title('Semua Buku')),
      S.listItem()
        .title('Tulisan')
        .icon(() => '✍️')
        .child(S.documentTypeList('post').title('Tulisan')),
      S.listItem()
        .title('Quotes')
        .icon(() => '💭')
        .child(S.documentTypeList('quote').title('Quotes')),
      S.divider(),
      S.listItem()
        .title('Pengguna')
        .icon(() => '👤')
        .child(S.documentTypeList('user').title('Pengguna')),
      S.listItem()
        .title('Konfigurasi')
        .icon(() => '⚙️')
        .child(S.documentTypeList('config').title('Konfigurasi')),
    ])
