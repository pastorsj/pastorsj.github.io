'use strict'

const markdown = require('markdown').markdown
const fs = require('fs')
const path = require('path')

function addStyles(html) {
  // Replaces any links in the Cited Sources sections with labels
  let citedSourcesStr = html.search(/<p><a href=".*?">.*?<\/a>[\s\S]*<\/p>/)
  let newCitedSourcesStr = html.substring(citedSourcesStr).replace(/<a href/g, '<a class="label label-info" href')
  html = html.replace(/<p><a href=".*?">.*?<\/a>[\s\S]*<\/p>/, newCitedSourcesStr)

  html = html.replace(/<h1>/g, '<h1 class="text-primary">')
  html = html.replace(/<h2>/g, '<h2 class="text-primary">')
  html = html.replace(/<h3>/g, '<h3 class="text-primary">')
  html = html.replace(/<h4>/g, '<h4 class="text-primary">')
  html = html.replace(/<h5>/g, '<h5 class="text-muted">')
  html = html.replace(/<h6>/g, '<h6 class="text-muted">')
  html = html.replace(/<code>/g, '<pre>')
  html = html.replace(/<\/code>/g, '</pre>')
  return html
}

function convert(postPath) {
  const htmlFile = path.basename(postPath).slice(0, -3) + '.html'
  let file
  try {
    file = fs.readFileSync(postPath).toString()
  } catch (e) {
    throw new Error(e)
  }
  file = addStyles(markdown.toHTML(file))
  try {
    fs.writeFileSync(path.join(__dirname, 'blog-posts-html', htmlFile), file)
  } catch (e) {
    throw new Error(e)
  }
}

function convertAllMDFiles() {
  try {
    let files = fs.readdirSync(path.join(__dirname, 'blog-posts-md'))
    files.forEach((file) => {
      let stats = fs.statSync(path.join(__dirname, 'blog-posts-md', file))
      if (stats.isFile() && file.endsWith('.md')) {
        convert(path.join(__dirname, 'blog-posts-md', file))
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}

convertAllMDFiles()
