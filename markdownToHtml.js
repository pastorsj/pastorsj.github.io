'use strict'

const markdown = require('markdown').markdown
const fs = require('fs')
const path = require('path')

function addStyles(html) {
  let citedSourcesStr = html.search(/<p><a href=".*?">.*?<\/a>[\s\S]*<\/p>/)
  let newCitedSourcesStr = html.substring(citedSourcesStr).replace(/<a href/g, '<a class="label label-info" href')
  html = html.replace(/<p><a href=".*?">.*?<\/a>[\s\S]*<\/p>/, newCitedSourcesStr)

  html = html.replace(/<h1>/g, '<h1 class="text-primary">')
  html = html.replace(/<h2>/g, '<h2 class="text-primary">')
  html = html.replace(/<h3>/g, '<h3 class="text-primary">')
  html = html.replace(/<h4>/g, '<h4 class="text-primary">')
  html = html.replace(/<h5>/g, '<h5 class="text-muted">')
  html = html.replace(/<h6>/g, '<h6 class="text-muted">')
  html = html.replace(/<code>/g, '<code><pre>')
  html = html.replace(/<\/code>/g, '</pre></code>')
  return html
}

function convert(postPath) {
  let file
  try {
    file = fs.readFileSync(postPath).toString()
  } catch (e) {
    throw new Error(e)
  }
  file = addStyles(markdown.toHTML(file))
  try {
    fs.writeFileSync(path.join(__dirname, 'blog-posts-html', 'bp-1.html'), file)
  } catch (e) {
    throw new Error(e)
  }
}

convert(path.join(__dirname, 'blog-posts-md', 'bp-1.md'))