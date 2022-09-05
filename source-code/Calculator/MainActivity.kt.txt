package com.example.calculator

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    private var canAddOperator= false
    private var canAddDecimal= true

    fun allClearAction(view: View){
        quest.text = ""
        ans.text = ""
    }

    fun backspaceAction(view:  View){
        var length= quest.length()
        if(length > 0){
            quest.text = quest.text.subSequence(0, length - 1)
        }
    }

    fun equalsAction(view: View){
        ans.text= calculateResults()
    }

    fun numberAction(view: View){
        if(view is Button){
            if(view.text == "."){
                if(canAddDecimal)
                    quest.append(view.text)
                canAddDecimal = false
            }else{
                quest.append(view.text)
            }
            canAddOperator= true
        }
    }

    fun operatorAction(view: View){
        if(view is Button && canAddOperator){
            quest.append(view.text)
            canAddOperator= false
            canAddDecimal= true
        }
    }

    private fun calculateResults(): String {
        var digitOperators= digitsOperators()
        if(digitOperators.isEmpty()) return ""

        val timesDivision= calTimesDivision(digitOperators)
        if(timesDivision.isEmpty()) return ""
        val results= addSubtract(timesDivision)
        return results.toString()
    }



    private fun digitsOperators():MutableList<Any>{
        val list = mutableListOf<Any>()
        var currentDigit=""
        for (character in quest.text){
            if (character.isDigit() || character == '.'){
                currentDigit += character
            }else{
                list.add(currentDigit.toFloat())
                currentDigit=""
                list.add(character)
            }
        }
        if(currentDigit != "")
            list.add(currentDigit.toFloat())
        return list
    }

    private fun calTimesDivision(plist:MutableList<Any>):MutableList<Any>{
        var list = plist
        while (list.contains('×') || list.contains('÷')) {
            list = timesDivision(list)
        }
        return list
    }

    private fun timesDivision(list: MutableList<Any>):MutableList<Any>{
        var list= list
        var index= list.size
        var nlist= mutableListOf<Any>()
        for (i in list.indices){
            if (list[i] is Char && list.lastIndex != i && i < index ){
                val operator = list[i]
                val prevDigit = list[i - 1] as Float
                val nextDigit = list[i + 1] as Float

                when (operator){
                    '×' ->  {
                        nlist.add(prevDigit * nextDigit)
                        index= i + 1
                    }

                    '÷' ->  {
                        nlist.add(prevDigit / nextDigit)
                        index= i + 1
                    }

                    else -> {
                        nlist.add(prevDigit)
                        nlist.add(operator)
                    }
                }
            }

            if(i > index){
                nlist.add(list[i])
            }
        }
        return nlist
    }

    private fun addSubtract(list: MutableList<Any>):Float{
       var result= list[0] as Float
        for (i in list.indices){
            if(list[i] is Char && i != list.lastIndex){
                val operator= list[i]
                val nextDigit= list[i + 1] as Float

                when(operator){
                    '+' -> {result += nextDigit}
                    '-' -> {result -= nextDigit}
                    else -> {return result}
                }
            }
        }

        return result
    }

}