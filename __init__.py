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

# import httplib2
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
    return render_template('about.html')

# Web Page #3 - Projects - show helpful links to ML resources
@app.route('/projects')
def showProjects():
    return render_template('projects.html')

# Web Page #3 - References - contains links to reference papers, articles, or slide decks which I have written 
@app.route('/resources')
def showResources():
    return render_template('resources.html')

# Web Page #4 - Contact - show ways to get in touch
@app.route('/contact')
def showContact():
    return render_template('contact.html')

# Web Page #5 - Projects: sentiment-dashboard
@app.route('/sentiment-dashboard')
def showSentimentDash():
    return render_template('sentiment_dash.html')

# Web Page #6 - Projects: stay_six_ft_apart
@app.route('/stay_six_ft_apart')
def showStaySixFtApart():
    return render_template('stay_six_ft_apart.html')

# Web Page #7 - Projects: tensorflow.js test page
@app.route('/tf_js')
def showTFJSTest():
    return render_template('tf_js_sandbox.html')

# Web Page #8 - Projects: pong AI game 
@app.route('/ai_pong')
def showAIPong():
    return render_template('ai_pong.html')

# Web Page #9 - Projects: path finder 
@app.route('/path_finder')
def showPathFinder():
    return render_template('path_finder.html')

# Web Page #10 - Projects: SageMaker Endpoint
@app.route('/sm_endpoint')
def showSageMakerEndpoint():
    return render_template('sagemaker_endpoint.html')

if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
