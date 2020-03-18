import Crate from './classes/Crate'
import StorageProvider from './classes/StorageProvider'
import FileProcessor from './classes/FileProcessor'
import LocalFsStorageProvider from './classes/LocalFsStorageProvider'
const crate = new Crate()

export default crate.plugin.bind(crate)
export {
    Crate,
    StorageProvider,
    FileProcessor,
    LocalFsStorageProvider
}