<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewpoint" content="width=device-width, initial-scale=1.0">
        <title>Sort alphabets</title>
    </head>
    <body>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="card mt-5">
                        <div class="card-header">
                            <h4>sort alphabetically</h4>
                        </div>
                        <div class="card-body">
                            <form action="" method="GET">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="input-group mb-3">
                                            <select name="sort alphabet" class="form-control">
                                                <option value="">--Default</option>
                                                <option value="a-z" <?php if(isset($_GET['sort_alphabet']) && $_GET['sort_alphabet'] == "a-z"){ echo "selected"; } ?>> A-Z(ascending order)</option>
                                                <option value="z-a" <?php if(isset($_GET['sort_alphabet']) && $_GET['sort_alphabet'] == "z-a"){ echo "selected"; } ?>>Z-A(descending order)</option>
                                            </select>
                                            <button type="submit" class="input-group-text btn btn-primary" id="basic-addon2">
                                                Sort
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>List</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 
                                          $con = mysqli_connect("localhost","root","","miniproject");

                                          $query = "SELECT * FROM title ORDER BY ASC"
                                        ?>  
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
