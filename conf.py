"""
Load configuration from .toml file
"""

import toml
from pathlib import path

# define path to this directory 
PATH_TO_THIS_FILE: Path = Path(__file__).resolve()
PATH_TO_TOML: Path = ABSPATH_TO_THIS_FILE.with_name("config.toml")

# use toml.load to read `config.toml` file in as a dictionary 
CONFIG_DICT: Dict = toml.load(str(ABSPATH_TO_TOML))

"""
We can now create the classes which will be imported and used for configuration
"""

class STYLE:
    """
    Config class containing the style elements which should be unified across the website 
    """
    navbar-color = CONFIG_DICT['style']['navbar-color']
    main-text-color = CONFIG_DICT['style']['main-text-color']
    hilight-text-color = CONFIG_DICT['style']['hilight-text-color']