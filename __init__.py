# -*- coding: utf-8 -*-
"""
This file contains a flask script which represents the website
spencerbertsch.com
"""
# Imports
from flask import (Flask, render_template, request, redirect, jsonify,
                   url_for, flash)

from flask import session as login_session
import random
import string

import httplib2
import json
from flask import make_response
import requests
import os

app = Flask(__name__)

# Web Page #1 - Catalog Homepage - Website homepage
@app.route('/')
@app.route('/home')
def showHomepage():
    return render_template('homepage.html')

# Web Page #2 - About - show all CV informaiton including education and work
@app.route('/about')
def showAbout():
    return '...About page here...' #render_template('about.html')

# Web Page #3 - ML Resources - show helpful links to ML resources
@app.route('/ml')
def showML():
    return '...ML page here...' #render_template('ml.html')

# Web Page #3 - Contact - show helpful links to ML resources
@app.route('/contact')
def showContact():
    return '...Contact page here...' #render_template('contact.html')

if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)









# end
