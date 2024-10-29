import stg from './stg';
import prd from './prd';
import local from './local';
import dev from './dev'
import defaultConfig from './default'

export const configs = {
	"dev": { ...defaultConfig, ...dev },
	"stg": { ...defaultConfig, ...stg },
	"local": { ...defaultConfig, ...local },
	"prd": { ...defaultConfig, ...prd }
}
