'use strict'
app.config(['$routeProvider',function($routeProvider){

  $routeProvider.when('/',{
    templateUrl:'search.html'
  }).when('/produit',{
    templateUrl:'produit.html'
  }).when('/recipe',{
    templateUrl:'recipe.html'
  }).otherwise({
    redirectTo:'/'
  });

}]);



app.controller('MainCtrl',['$scope','$http','$location',function($scope, $http,$location) {

  $scope.rechercherProduit = function(maRoute,codeProduit){
  console.log(codeProduit);
  $location.path(maRoute);
  var monProduit;
  var monCodeProduit = codeProduit;

      $http.get('http://fr.openfoodfacts.org/api/v0/produit/'+monCodeProduit+'.json').then(function(response){

              //affichage du nom du produit
              //console.log('Name: '+response.data.product.product_name);
              //affichage de la liste de la desc.
              //console.log(response.data.product._keywords);
              var descriptionAliment = response.data.product._keywords;
              console.log(descriptionAliment)

              //parcour de la description si on trouve des recette avec l'aliment selectionné.
              for(var aliment in descriptionAliment){
                //affichage de la list de la descritpion aliment par aliment .
                //console.log(descriptionAliment[aliment]);
                if (['saumon','poulet','riz'].indexOf(descriptionAliment[aliment]) >-1){
                    monProduit = descriptionAliment[aliment];
                    //console.log(aliment);
                }
              }

              //affichage de mon produit .
              console.log(monProduit);
              $scope.produit = response.data;
                console.log($scope.produit)
                //http pour parcontre le json avec les menus
                  $http.get('recettes.json').then(function(responseJson){
                      //liste toutes recettes
                      var listeDesRecettes = responseJson.data.recettes;
                      //liste recette choisi
                      var recettesChoisi=[]
                      //affichage de la premiere recette
                      //console.log(listeDesRecettes);

                      for (var recette in listeDesRecettes)
                      {
                        if(monProduit == listeDesRecettes[recette].aliment)
                        {
                        console.log(listeDesRecettes[recette]);
                        recettesChoisi.push(listeDesRecettes[recette]);
                        }
                      }
                      $scope.recettesChoisi = recettesChoisi;
                      console.log(recettesChoisi[0].imageAliment);
                      $scope.imageAliment = recettesChoisi[0].imageAliment;

                  });//fin http pour mon fichier json


      });//fin http pour l'API openfoodfacts


  };//fin de la fonction de rechercherProduit sur click
//Début de la récupération des recettes :
// $http.get('./recettes.json').then(function(response){
//   $scope.recettes = response;
// })
$http.get('recettes.json')
.then(function successCallback(responseDeux) {
     $scope.recipe = responseDeux.data.recettes;
 },
 function errorCallback(response) {
     alert(response);
 });

 //YATAAAA ENFIN REUSSI !!
 // cette fonction récupère l'objet sur laquelle elle est appeléé

$scope.goToRecipe = function(recetteDeFin){
  console.log(recetteDeFin.nom);
  $scope.imgRecette = recetteDeFin.image;
  $scope.nomRecette = recetteDeFin.nom;
  //Initialisation du tableau qui récupère le tableau compris dans l'objet
  $scope.recetteaAfficher = [];
  $scope.recetteaAfficher.push(recetteDeFin.ingredients);


  $location.path('/recipe')

}
 }]); //fin controller
