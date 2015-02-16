###
Marker.js: Port of the original Cliff.Highlights
Copyright 2015 Pouya Kary. <k@arendelle.org>
###

#
# INFO
#
marker_version = '1.08'


#
# markerInitHighlightingOnLoad
#

markerInitHighlightingOnLoad = ->
  elements = document.getElementsByClassName('arendelle')
  i = 0
  while i < elements.length
    elements[i].innerHTML = highlight(elements[i].innerHTML)
    i++
  return

#
# Returns highlighted 'text' value
#

highlight = (text) ->

  #
  # COLORS
  #
  
  loop_color = 'D60073'
  data_color = '4E00FC'
  comment_color = 'A0A0A0'
  string_color = 'BD00AD'
  number_color = '6200A8'
  function_color = '8C007F'
  
  #
  # TAGS
  #
  
  start = '<span style="color: #'
  middle = ';">'
  end = '</span>'
  result = ''
  text = text.replace('&lt;', '<').replace('&gt;', '>')
  
  #
  # BODY
  #
  
  i = 0
  while i < text.length
    reading_char = text[i]
    switch reading_char
    
      #
      # GRAMMARS
      #
      
      when '[', ']', ')', '{', '}', ';', ','
        result += start + loop_color + middle + reading_char + end
        
      #
      # SPECIAL CHARACTERS
      #
      
      when '<'
        result += start + loop_color + middle + '&lt;' + end
      when '>'
        result += start + loop_color + middle + '&gt;' + end
        
      #
      # ( space name highlighter , 0 )
      #
      
      when '('
        result += start + loop_color + middle + reading_char + end
        space_init_string = ''
        while_control_6 = true
        i++
        while i < text.length and while_control_6
          if /[\.a-z0-9 ]/i.test(text[i])
            space_init_string += text[i]
          else
            while_control_6 = false
            i--
          i++
        if /^ *[a-z][\.a-z0-9 ]*$/i.test(space_init_string)
          result += start + data_color + middle + space_init_string + end
        else
          result += highlight(space_init_string)
        i--
        
      #
      # NUMERICS
      #
      
      when '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'
        number_string = ''
        while_control_1 = true
        number_string += reading_char
        i++
        while i < text.length and while_control_1
          if /[0-9\.]/.test(text[i])
            number_string += text[i]
          else
            while_control_1 = false
            i--
            break
          i++
        result += start + number_color + middle + number_string + end
        
      #
      # { SPACE, SOURCE, STORED SPACE, FUNCTIONS 
      #
      
      when '@', '#', '!', '$'
        data_string = ''
        while_control_2 = true
        data_string += reading_char
        i++
        while i < text.length and while_control_2
          if /[a-z0-9\?\. ]/i.test(text[i])
            data_string += text[i]
          else
            while_control_2 = false
            i--
            break
          i++
        result += start + data_color + middle + data_string + end
        
      #
      # COMMENTS
      #
      
      when '/'
        comment_string = ''
        if i < text.length - 1
          i++
          if text[i] == '/'
            comment_string = '//'
            i++
            while i < text.length and text[i] != '\n'
              comment_string += text[i]
              i++
            result += start + comment_color + middle + comment_string + end
            i--
          else if text[i] == '*'
            i++
            comment_string = '/*'
            while_control_5 = true
            while i < text.length and while_control_5
              if text[i] == '*' and i < text.length - 1
                i++
                if text[i] == '/'
                  comment_string += '*/'
                  while_control_5 = false
                else
                  comment_string += '*' + text[i]
                  i++
              else
                comment_string += text[i]
                i++
            result += start + comment_color + middle + comment_string + end
          else
            result += '/' + text[i]
        else
          result += '/'
          
      #
      # STRINGS
      #
      
      when '\'', '"'
        string_string = ''
        string_sign = reading_char
        while_control_3 = true
        i++
        
        
        #
        # STRING READER
        #
        
        while i < text.length and while_control_3
          switch text[i]
            when string_sign
              result += start + string_color + middle + string_sign + string_string + string_sign + end
              while_control_3 = false
              i--
              
              
            #
            # SCAPE SEQUANCE READER
            #
            
            when '\\'
              i++
              switch text[i]
              
              
                #
                # STRING REPLACER READER
                #
                
                when '('
                  while_control_4 = true
                  string_replacer_string = ''
                  indent_level = 0
                  while i < text.length and while_control_4
                    i++
                    if text[i] == '('
                      indent_level++
                    else if text[i] == ')'
                      if indent_level == 0
                        while_control_4 = false
                        i++
                        string_string += end + '\\(' + highlight(string_replacer_string) + ')' + start + string_color + middle
                      indent_level--
                    else
                      string_replacer_string += text[i]
                      
                      
                #
                # DONE: STRING REPLACER READER
                #
                
                else
                  string_string += start + data_color + middle + '\\' + text[i] + end
                  i++
              i--
              
              
            #
            # DONE: SCAPE SEQUANCE READER
            #
            else
              string_string += text[i]
          i++
          
      #
      # DONE: STRING READER
      #
      
      
      #
      # WHITESPACE HANDLERS
      #
      when '\n'
        result += '<br>'
      when ' '
        result += '&nbsp;'
      when '\u9'
        result += '&nbsp;&nbsp;&nbsp;'
      else
        result += reading_char
    i++
  result