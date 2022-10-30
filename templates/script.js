<script>
function myFunction() {
 var rows = document.getElementById(“table-row-num”).value;
 var html=’<thead>’+
 ‘<tr>’ +
 ‘<th>ID</th>’ +
 ‘<th>Label</th>’+
 ‘<th>Image_cat_1</th>’+
 ‘<th>value</th>’+
 ‘</thead>’;
 for (var i = 0; i < rows; i++) {
 html += “<tbody>”+”<tr>” +
 “<td>” + (i + 1) + “</td>” +
 “<td><input type=’text’ name=’Label’ id=’ins_Label[“+ i +”]’ class=’form-control input_data’ placeholder=’Label’></td>” +
 “<td><input type=’text’ name=’Image_cat_1’ id=’ins_Image_cat_1[ “+i +”]’ class=’form-control input_data’ placeholder=’Image_cat_1’></td>” +
 “<td> <input type=’int’ name=’value’ class=’form-control input_data’ id=’ins_value[“+i +”]’ placeholder=’value’></td>” +
 “</tr>”
 +”</tbody>”;
 }
$(‘table’).html(html);
}
$(“.btn-insert-data”).click(function(){
var json_data=[];
 $(“.input_data”).each(function(){
 var value=$(this).val();
 var parent_html=$(this).parent();
 parent_html.html(value);
 $(this).remove();
 });
 $(“tbody tr”).each(function(){
 var id=$(this).children().eq(0).text()
 var Label=$(this).children().eq(1).text()
 var Image_cat_1=$(this).children().eq(2).text()
 var value=$(this).children().eq(3).text()
 var single_data={“id”:id,”Label”:Label,”Image_cat_1”:Image_cat_1,”value”:value};
 json_data.push(single_data);
 });
 var string_data=JSON.stringify(json_data)
 $.ajax({
 url:’{% url ‘insert’ %}’,
 type:’POST’,
 data:{data:string_data}
 })
 .done(function(response){
 if(response[‘error’]==false){
 $(“#upt_error”).hide();
 $(“#upt_success”).text(response[‘errorMessage’]);
 $(“#upt_success”).show();
}
 else{
 $(“#upt_success”).hide();
 $(“#upt_error”).text(response[‘errorMessage’]);
 $(“#upt_error”).show();
 }
 })
 .fail(function(){
 $(“#upt_success”).hide();
 $(“#upt_error”).text(“Something Went Wrong!”);
 $(“#upt_error”).show();
 })
});
    <form action="http://localhost:3306/upload" enctype="multipart/form-data" method="POST"> 
   <input type="file" Label="pic" />
   <input type="submit" value="Upload a file"/>
   </form>
    <header>
        <div class="logo">
            <img src="img/logo.png" alt="">
        </div>
    </header>
    <main>
        <div class="row">
            <div class="row1">

            </div>
            <div class="row2">
                <div class="col1">
                        <h1>Menu</h1>
                        <div class="hl"></div>
                        <div class="hl"></div>
                        <div class="hl"></div>
                </div>
                <div class="col2">
                    <div class="row2-1">
                        <div class="left">
                            <button><img src="img/plus.png" alt=""></button>
                            <button><img src="img/copy.png" alt=""></button>
                            <button><img src="img/delete.png" alt=""></button>
                        </div>
                        <div class="right">
                            <button><img src="img/setting.png" alt=""></button>
                        </div>
                    </div>
                    <div class="row2-2">

                    </div>
                </div>
            </div>
        </div>
        @csrf_exempt
def insert(request):
    data=request.POST.get("data")
    dict_data=json.loads(data)
    try:
        for dic_single in dict_data:
            details=Details()
            details.Label=dic_single['Label']
            details.Image_cat_1=dic_single['Image_cat_1']
            details.value=dic_single['value']
            details.save()
        response_data={"error":False,"errorMessage":"Updated Successfully"}
        return JsonResponse(response_data,safe=False)
    except:
        response_data={"error":True,"errorMessage":"Failed to Update Data"}
        return JsonResponse(response_data,safe=False)
        <div class="container">
    <div class="row form-group" style="margin-top:30px;">
        <div class="col-lg-6">
            <a href="{% url 'insert_table' %}" class="btn btn-block btn-success" role="button" aria-pressed="true">Insert Data</a>
</div>
        <div class="col-lg-6">
            <button class="btn btn-block btn-success" id="update_btn">EDIT ALL</button>
            <button class="btn btn-block btn-success" id="save_all_btn" style="display:none;margin-top:0px">SAVE ALL</button>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
              <div class="alert alert-success" id="upt_success" style="display:none">
</div>
               <div class="alert alert-danger" id="upt_error" style="display:none">
</div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="table">
                <table class="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Label</th>
                        <th>Image_cat_1</th>
                        <th>value</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {% for value in data %}
                    <tr>
                        <td>{{ value.id }}</td>
                        <td class="editable" data-type="Label">{{ value.Label }}</td>
                        <td class="editable" data-type="Image_cat_1">{{ value.Image_cat_1 }}</td>
                        <td class="editable" data-type="value">{{ value.value }}</td>
                        <td class="btn-td-block"><button class="btn btn-block btn-delete btn-danger">DELETE</button></td>
                    </tr>
                    {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
def HomePage(request):
    data=Details.objects.all()
    return render(request,"homepage.html",{"data":data})
    $("#update_btn").click(function(){
            $("#update_btn").hide();
            $("#save_all_btn").show();
$(".editable").each(function(){
           var value=$(this).text();
           var types=$(this).data('type');
                var html_data="<input type='text' name='"+types+"'  class='form-control input_"+types+" input_data' value='"+value+"'>";
                $(this).html(html_data);
        });
    });
$("#save_all_btn").click(function(){
        $("#save_all_btn").attr("disabled","disabled");
        $("#save_all_btn").text("Saving Data....");
var json_data=[];
        $(".input_data").each(function(){
                var value=$(this).val();
                var parent_html=$(this).parent();
                parent_html.html(value);
                $(this).remove();
         });
        $("tbody tr").each(function(){
             var id=$(this).children().eq(0).text()
             var Label=$(this).children().eq(1).text()
             var Image_cat_1=$(this).children().eq(2).text()
             var value=$(this).children().eq(3).text()
             var single_data={"id":id,"Label":Label,"Image_cat_1":Image_cat_1,"value":value};
             json_data.push(single_data);
        });
var string_data=JSON.stringify(json_data)
        $.ajax({
                url:'{% url 'update_details' %}',
                type:'POST',
                data:{data:string_data}
            })
            .done(function(response){
                if(response['error']==false){
                    $("#upt_error").hide();
                    $("#upt_success").text(response['errorMessage']);
                    $("#upt_success").show();
}
                else{
                    $("#upt_success").hide();
                    $("#upt_error").text(response['errorMessage']);
                    $("#upt_error").show();
                }
            })
            .fail(function(){
                 $("#upt_success").hide();
                 $("#upt_error").text("Something Went Wrong!");
                 $("#upt_error").show();
            })
            .always(function(){
                 $("#save_all_btn").removeAttr("disabled");
                 $("#save_all_btn").text("SAVE ALL");
                 $("#update_btn").show();
                 $("#save_all_btn").hide();
            })
});@csrf_exempt
def update_details(request):
    data=request.POST.get("data")
    dict_data=json.loads(data)
    try:
        for dic_single in dict_data:
            details=Details.objects.get(id=dic_single['id'])
            details.Label=dic_single['Label']
            details.Image_cat_1=dic_single['Image_cat_1']
            details.value=dic_single['value']
            details.save()
        response_data={"error":False,"errorMessage":"Updated Successfully"}
        return JsonResponse(response_data,safe=False)
    except:
        response_data={"error":True,"errorMessage":"Failed to Update Data"}
        return JsonResponse(response_data,safe=False)
        $(document).on("click",".btn-delete",function(){
            var this_html=$(this);
            this_html.attr("disabled","disabled");
            this_html.text("DELETING....");
            var id=this_html.parent().parent().children().first().text();
            //console.log(id);
            $.ajax({
                url:'{% url 'delete_details' %}',
                type:'POST',
                data:{id:id}
            })
            .done(function(response){
                if(response['error']==false){
                    this_html.parent().parent().remove();
                    $("#upt_error").hide();
                    $("#upt_success").text(response['errorMessage']);
                    $("#upt_success").show();
}
                else{
                    $("#upt_success").hide();
                    $("#upt_error").text(response['errorMessage']);
                    $("#upt_error").show();
                }
            })
            .fail(function(){
                 $("#upt_success").hide();
                 $("#upt_error").text("Something Went Wrong!");
                 $("#upt_error").show();
            });
    });
    @csrf_exempt
def delete_details(request):
    id=request.POST.get("id")
    try:
        details=Details.objects.get(id=id)
        details.delete()
        response_data={"error":False,"errorMessage":"Deleted Successfully"}
        return JsonResponse(response_data,safe=False)
    except:
        stuent_data={"error":True,"errorMessage":"Failed to Delete Data"}
        return JsonResponse(response_data,safe=False)
        </main>
        <script src="https://unpkg.com/gridjs/dist/gridjs.umd.js"></script>
    <script>

      new gridjs.Grid({
        columns: [
          { id: 'Label', Label: 'Label' },
          { id: 'image_cat_1', Label: 'Image_cat_1' },
          { id: 'image_cat_2', Label: 'Image_cat_2', sort: false },
          { id: 'value', Label: 'Value', sort: false },
          
        ],
        server: {
          url: '/api/data',
          then: results => results.data,
        },
        search: {
          selector: (cell, rowIndex, cellIndex) => [0, 1, 4].includes(cellIndex) ? cell : null,
        },
        sort: true,
        pagination: true,
      }).render(document.getElementById('table'));
      </script>
    
</body>
</html>
